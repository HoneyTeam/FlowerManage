import React,{Component} from 'react'
import {Card,Button,Form,Input,Select} from 'antd'
import {Tooltip,Icon,Cascader,Row,Col,Checkbox,AutoComplete,Upload,message} from 'antd';
import './index.less' 
import Axios from 'axios';
import qs from 'qs'
const { Option } = Select;
const AutoCompleteOption = AutoComplete.Option;

// import qs from 'qs'
class Useradd extends Component{
        constructor(){
            super()
            this.state={
                confirmDirty: false,
                autoCompleteResult: [],
                fileList:[],
                imgurl:''
            }
        }
        handleConfirmBlur = e => { //密码复验
            const { value } = e.target;

            this.setState({ confirmDirty: this.state.confirmDirty || !!value });
          };
        onChange(info) {
            if (info.file.status !== 'uploading') {
            console.log(info.file, info.fileList)
            }
            if (info.file.status === 'done') {
            message.success(`${info.file.name} file uploaded successfully`);
            } else if (info.file.status === 'error') {
            message.error(`${info.file.name} file upload failed.`);
            }
        }
        Uploadimg=()=>{
            let {fileList,imgurl}=this.state
            //console.log('啦啦啦啦啦啦啦啦',fileList)
            const formData=new FormData()
            formData.append('img',fileList[0]);
            this.$axios.post('/hehe/admin/file/upload',formData)
            .then((data)=>{
                console.log(data)
                this.setState({imgurl:data.data.imgpath})
                imgurl=data.data.imgpath
            })
        }
        jump=()=>{
            this.props.form.validateFields((err,data)=>{
                //let {phone,nickname,prefix}=this.data
                let userimg=this.state.imgurl
                let username=data.nickname
                let userpho=data.phone
                let pwd=data.password
                let string=qs.stringify({userimg,username,userpho,pwd})
                console.log('输出数据',userimg,username,userpho,pwd)
                let pho=/^1([38]\d|5[0-35-9]|7[3678])\d{8}$/
                if(data.confirm===data.password){
                    if(pho.test(data.phone)){
                        if(this.state.imgurl){
                            this.$axios.get('/hehe/admin/Fuser/add?'+string)
                            .then((data)=>{
                                console.log('111111111111111',data)
                                message.success('添加成功')
                                this.props.history.push('/admin/user/list')
                            })
                        }else{
                            message.error("请先上传图片")
                        }
                    }else{
                        message.error('电话号码输入错误! ')
                    }
                   
                }else{
                    message.error('密码两次输入不一样')
                }
            })
        }
       render(){
        const { fileList} = this.state;  
        const { getFieldDecorator } = this.props.form;
        let url='http://10.9.22.239:8080'
        const prefixSelector = getFieldDecorator('prefix', {
            initialValue: '86',
          })(
            <Select style={{ width: 70 }}>
              <Option value="86">+86</Option>
              <Option value="87">+87</Option>
            </Select>,
          );
          const tailFormItemLayout = {
            wrapperCol: {
              xs: {
                span: 24,
                offset: 0,
              },
              sm: {
                span: 16,
                offset: 8,
              },
            },
          };
          const props = {
            onRemove: file => {  //点击x删除一条
              this.setState(state => {
                const index = state.fileList.indexOf(file);
                const newFileList = state.fileList.slice();
                newFileList.splice(index, 1);
                return {
                  fileList: newFileList,
                };
              });
            },
            beforeUpload: file => {  //点击图片选择后，获得图片信息
              //console.log('beforeUpload',file)
              let fileList=this.state.fileList
              fileList.push(file)
              this.setState({fileList:fileList}) //将图片信息放到state数据里面
             return false;
           },
            fileList,
          };
          const {imgurl} = this.state;  
          //console.log('呵呵呵额呵呵',this.state.imgurl)
          return (
            
            <Form className="orderadd">
              <Form.Item
                label={
                    <span>
                    用户名&nbsp;
                    <Tooltip title="请输入名字">
                        <Icon type="question-circle-o" />
                    </Tooltip>
                    </span>
                }
                >
                {getFieldDecorator('nickname', {
                    rules: [{ required: true, message: '不能为空!', whitespace: true }],
                })(<Input />)}
                </Form.Item>


              <Form.Item label="输入密码" hasFeedback>
                {getFieldDecorator('password', {
                    rules: [
                    {
                        required: true,
                        message: '不能为空!',
                    },
                    {
                        validator: this.validateToNextPassword,
                    },
                    ],
                })(<Input.Password />)}
                </Form.Item>

              
              <Form.Item label="确认密码" hasFeedback>
                {getFieldDecorator('confirm', {
                    rules: [
                    {
                        required: true,
                        message: '不能为空!',
                    },
                    {
                        validator: this.compareToFirstPassword,
                    },
                    ],
                })(<Input.Password onBlur={this.handleConfirmBlur} />)}
                </Form.Item>

                    <Form.Item label="输入电话">
                        {getFieldDecorator('phone', {
                            rules: [{ required: true, message: '不能为空!' }],
                        })(<Input addonBefore={prefixSelector} style={{ width: '100%' }} />)}
                        </Form.Item>

                <Upload {...props}>
                    <Button >
                    <Icon type="upload"/> 选择头像
                    </Button>
                   
                </Upload>
                    
                    <Button onClick={this.Uploadimg}>上传</Button>
                    <img src={url+imgurl} alt="" width='80' height='80'/>
                    <Form.Item {...tailFormItemLayout}>
                    <Button type="primary" htmlType="submit" onClick={this.jump}>
                    提交
                    </Button>
                </Form.Item> 
            </Form>
          );
        }
      }
export default Form.create()(Useradd)
