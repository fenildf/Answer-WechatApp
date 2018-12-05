<template>
    <div id="question">
        <div class="header-search">
            <el-select v-model="value" placeholder="请选择" size="small">
                <el-option
                        v-for="item in menu"
                        :key="item.value"
                        :label="item.label"
                        :value="item.value">
                </el-option>
            </el-select>
            <el-input v-model="value1" placeholder="标题搜索" style="width: 200px;" size="small"></el-input>
            <el-button size="small" @click="getQuestions">搜索</el-button>
            <el-button size="small" @click="dialogVisible = true">增加题目</el-button>
        </div>
        <tablelist :loading="loading" :table-setting="tableSetting" @control="handlecontrol"></tablelist>
        <!--分页-->
        <div class="pagination">
            <el-pagination :current-page="pageSetting.currentPage"
                           :page-size="pageSetting.pageSize"
                           :total="pageSetting.total"
                           layout="total, prev, pager, next, jumper"
                           @size-change="handleSizeChange"
                           @current-change="handleCurrentChange">

            </el-pagination>
        </div>

        <!--add question dialog-->
        <el-dialog title="增加题目" :visible.sync="dialogVisible" width="40%">
            <el-form ref="ruleForm" :model="form" :rules="rules" label-width="80px">
                <el-row>
                    <el-form-item label="题目" prop="title">
                        <el-input size="small" type="textarea"></el-input>
                    </el-form-item>
                </el-row>
                <el-row>
                    <el-form-item label="所属套题" prop="menu">
                        <el-select v-model="form.menu" placeholder="请选择" size="small">
                            <el-option
                                    v-for="item in menu1"
                                    :key="item.value"
                                    :label="item.label"
                                    :value="item.value" />
                        </el-select>
                    </el-form-item>
                </el-row>
                <el-row>
                    <el-form-item label="图片">
                        <el-upload
                            :http-request="ImgReq"
                            :show-file-list="false"
                            :on-change="handleChange"
                            class="avatar-uploader"
                        >
                            <i v-if="imgLoading" class="avatar-uploader-icon el-icon-loading"/>
                            <img v-else-if="form.pic" :src="form.pic" class="avatar">
                            <i v-else class="el-icon-plus
                            avatar-uploader-icon"/>
                        </el-upload>
                    </el-form-item>
                </el-row>
                <el-row>
                    <el-form-item label="题目类型" label-width="80px" prop="type">
                        <el-select v-model="form.type" placeholder="请选择" size="small">
                            <el-option
                                    v-for="item in type"
                                    :key="item.value"
                                    :label="item.label"
                                    :value="item.value" />
                        </el-select>
                    </el-form-item>
                </el-row>
                <el-row>
                    <el-form-item label="答案选项" label-width="80px" prop="checkitems">
                        <!-- 单选 -->
                        <el-checkbox-group v-if="form.type === '1'" v-model="form.choseList" :max="1" class="select-group">
                            <el-checkbox v-for="(item,index) in form.checkitems" :label="index" :key="item.id"  style="margin:0">
                                <el-input v-model="item.item" size="small"></el-input>
                                <el-button v-if="form.checkitems.length < 6 " type="text" @click="addOption"><i class="el-icon-circle-plus-outline"/></el-button>
                                <el-button v-if="form.checkitems.length > 1 " type="text" @click="removeOption(index)"><i class="el-icon-remove-outline"/></el-button>
                            </el-checkbox>
                        </el-checkbox-group>
                        <!--多选-->
                        <el-checkbox-group v-else-if="form.type === '2'" v-model="form.choseList" :max="form.checkitems.length" class="select-group">
                            <el-checkbox v-for="(item,index) in form.checkitems" :label="index" :key="index" style="margin:0">
                                <el-input v-model="item.item" size="small"></el-input>
                                <el-button v-if="form.checkitems.length < 6 " type="text" @click="addOption"><i class="el-icon-circle-plus-outline"/></el-button>
                                <el-button v-if="form.checkitems.length > 1 " type="text" @click="removeOption(index)"><i class="el-icon-remove-outline"/></el-button>
                            </el-checkbox>
                        </el-checkbox-group>
                        <div v-else>请选择题目类型</div>
                    </el-form-item>
                </el-row>
                <el-row>
                    <el-form-item label="帮助描述" prop="help">
                        <el-input size="small" type="textarea"></el-input>
                    </el-form-item>
                </el-row>
            </el-form>
            <div style="margin-left: 80px;margin-top: 30px;">
                <el-button @click="dialogVisible = false">取 消</el-button>
                <el-button type="primary" @click="handleSubmit('ruleForm')">确 定</el-button>
            </div>
        </el-dialog>
    </div>
</template>

<script>
    export default{
        data() {
            var validateNull = (rule,value,callback) =>{
                if(!value){
                    callback(new Error('该值不为空'))
                }else{
                    callback()
                }
            }
            var validateArr = (rule,value,callback)=>{
                for(var v of value){
                    if (v.value === '') {
                        isNull = true
                    }
                }
                if (isNull) {
                    callback(new Error('题目选项不可为空'))
                } else if (value.length <= 1) {
                    callback(new Error('题目选项不可只有1项'))
                } else if (this.form.questionOptions.length === 0) {
                    callback(new Error('请勾选题目正确选项'))
                } else {
                    callback()
                }
            }
            return {
                value: '',
                value1:'',
                loading:false,
                dialogVisible:false,
                imgLoading:false,
                file:'',
                menu:[
                    {
                        value:'',
                        label:'所有套题'
                    }
                ],
                type:[
                    {
                        value: '1',
                        label: '单选'
                    },
                    {
                        value: '2',
                        label: '多选'
                    },
                ],
                menu1:[],
                pageSetting:{
                    currentPage:1,
                    total:0,
                    pageSize:10
                },
                tableSetting:{
                    tableData:[],
                    column:[
                        {
                            prop:'objectId',
                            label:'objectId'
                        },
                        {
                            prop:'title',
                            label:'标题'
                        },
                        {
                            prop:'type',
                            label:'题目类型'
                        },
                        {
                            prop:'menu',
                            label:'所属套题'
                        },
                        {
                            prop:'picUrl',
                            label:'图片',
                            type: 'image'
                        }
                    ],
                    control:[
                        {
                            type:'edit',
                            name:'修改'
                        },
                        {
                            type:'delete',
                            name:'删除'
                        }
                    ]
                },
                form:{
                    title:'',
                    menu:'',
                    picUrl:'',
                    help:'',
                    type:'',
                    choseList:[],
                    checkitems:[
                        {
                            item:''
                        }
                    ]
                },
                rules:{
                    title:{ validator:validateNull,trigger:'change'},
                    menu:{ validator:validateNull,trigger:'change' },
                    type:{ validator:validateNull,trigger:'change' },
                    help:{ validator:validateNull,trigger:'change' },
                    checkitems:{ validator: validateArr,trigger:'change'}
                },
            }
        },
        mounted(){
            this._getMenus();
            this.getQuestions()
        },
        methods:{
            _getMenus(){
                var menu = this.$Bmob.Query('questionMenu')
                menu.find().then(res =>{
                    console.log(res)
                    for (var i in res){
                        res[i].value = res[i].objectId
                        res[i].label = res[i].name
                        this.menu.push(res[i])
                        this.menu1.push(res[i])
                    }
                })
            },
            getQuestions(){
                //this.loading = true
                var query = this.$Bmob.Query('questions')
                var params = {
                    menu:this.value,
                    title:this.value1
                }
                for(var param in params){
                    if(params[param] !==''){
                        query.equalTo(param ,'==', params[param])
                    }
                }
                query.count().then(res =>{
                    this.pageSetting.total = res
                    query.limit(this.pageSetting.pageSize)
                    query.skip(this.pageSetting.pageSize * (this.pageSetting.currentPage - 1))
                    query.order('-createdAt')
                    query.find().then(res1=>{
                        console.log(res1)
                        for (var r of res1){
                            if(r.type == '1'){
                                r.type = '单选'
                            }else{
                                r.type = '多选'
                            }
                            for (var m of this.menu){
                                if(r.menu == m.value){
                                    r.menu = m.label
                                }
                            }
                        }
                        this.tableSetting.tableData = res1
                        this.loading = false
                    })
                })
            },

            handleSizeChange(val){
                this.loading = true
                this.pageSetting.currentPage = val
                this.getQuestions()
            },
            handleCurrentChange(val){
                this.loading = true
                this.pageSetting.currentPage = val
                this.getQuestions()
            },
            handlecontrol(params){
                console.log(params)
                if(params.item.type === 'delete'){
                    this.delete(params.scope)
                }else if(params.item.type === 'edit'){
                    this.handlesort(params.scope)
                }
            },
            ImgReq(req){
                console.log(req)
                var index = req.file.name.lastIndexOf('.')
                var ext = req.file.name.substr(index + 1)
                const imgArr = ['jpg', 'png', 'gif', 'pic', 'jpeg', 'svg']
                var exist = imgArr.indexOf(ext)
                this.imgLoading = true
                if(exist == -1){
                    this.$message.warning('图片格式有误')
                    this.imgLoading = false
                    return
                }
                var file = this.$Bmob.File(this.file.name, this.file.raw)
                file.save().then(res => {
                    const fileRes = res[0]
                    this.form.pic = fileRes.url
                    this.imgLoading = false
                })


            },
            handleChange(file, fileList){
                console.log(file)
                console.log(fileList)
                this.file = fileList[fileList.length -1 ]
            },
            addOption(){
                this.form.checkitems.push({
                    item:''
                })
            },
            removeOption(index){
                this.form.checkitems.splice(index, 1)
            },
            handleSubmit(formName){
                this.$refs[formName].validate((valid)=>{
                    if(valid){

                    }else{
                        return false
                    }
                })
            }
        }
    }
</script>

<style>
    .avatar-uploader {
        display: inline-block;
        height: 60px;
        width: 60px;
    }
    .avatar-uploader .el-upload {
        border: 1px dashed #d9d9d9;
        border-radius: 6px;
        cursor: pointer;
        position: relative;
        overflow: hidden;
    }
    .avatar-uploader .el-upload:hover {
        border-color: #409EFF;
    }
    .avatar-uploader-icon {
        font-size: 28px;
        color: #8c939d;
        width: 60px;
        height: 60px;
        line-height: 60px;
        text-align: center;
    }
    .avatar {
        width: 100px;
        height: 100px;
        display: block;
    }
    .select-group {
        display: flex;
        flex-direction: column;
    }
</style>