import {
    Button,
    Checkbox,
    Col,
    DatePicker,
    Form,
    Input,
    Radio,
    Row,
    Space,
    Upload
} from 'antd';
import { useState } from 'react';

import { UploadOutlined } from '@ant-design/icons';

const FormOne = () => {
    const [selectedFile, setSelectedFile] = useState(null);
    const [isValid, setIsValid] = useState(true);
    /*
    *Form Submit 
    **/
    const handleSubmit = (event: any) => {
        event.preventDefault();

        // Perform further actions with the selectedFile, such as uploading it to the server
        if (selectedFile) {
            // Perform upload logic here
        } else {
            alert('Please select a file.');
        }
    };

    /*
   * File Upload
   **/
    const handleFileChange = (event: any) => {
        const file = event.file;
        const fileSize = file.size / 1024 / 1024; // File size in MB
        const allowedExtensions = ['.jpg', '.jpeg', '.png', '.pdf'];

        if (
            !allowedExtensions.some((ext) => file.name.toLowerCase().endsWith(ext))
        ) {
            alert('Invalid file type. Please upload a JPG, PNG, or PDF file.');
            event.file = ''; // Clear the file input
            setSelectedFile(null);
        } else if (fileSize > 1) {
            // Max file size is 10 MB
            alert('File size exceeds the allowed limit of 10MB.');
            event.file = '';
            setSelectedFile(null);
        } else {
            setSelectedFile(file);
        }
    };


    const normFile = (e: any) => {
        console.log('Upload event:', e);
        if (Array.isArray(e)) {
            return e;
        }
        return e?.fileList;
    };

    const onFinishFailed = (errorInfo: any) => {
        console.log('Failed:', errorInfo);
    };


    return (
        <Form
            name="basic"
            labelCol={{ span: 8 }}
            wrapperCol={{ span: 16 }}
            style={{ maxWidth: 600 }}
            initialValues={{ remember: true }}
            onFinish={handleSubmit}
            onFinishFailed={onFinishFailed}
            autoComplete="off"
        >
            <Form.Item
                label="First Name"
                name="first name"
                rules={[
                    { required: true, message: 'Please input your first name!' },
                    {
                        max: 10,
                        message: 'Value should be less than 10 character',
                    },
                    {
                        min: 5,
                        message: 'Value should be more than 5 character',
                    },
                ]}
            >
                <Input maxLength={15} />
            </Form.Item>
            <Form.Item
                label="Last Name"
                name="last"
                rules={[
                    { required: true, message: 'Please input your last name!' },
                    {
                        max: 10,
                        message: 'Value should be less than 10 character',
                    },
                    {
                        min: 5,
                        message: 'Value should be more than 5 character',
                    },
                ]}
            >
                <Input maxLength={15} />
            </Form.Item>
            <Form.Item
                label="Password"
                name="Password"
                rules={[
                    { required: true, type: 'number' },
                    {
                        max: 15,
                        message: 'Value should be less than 10 character',
                    },
                    {
                        min: 5,
                        message: 'Value should be more than 5 character',
                    },
                ]}
            >
                <Input.Password placeholder="input password" maxLength={15} />
                {/* <Input.Password
          placeholder="input password"
          iconRender={(visible) =>
            visible ? <EyeTwoTone /> : <EyeInvisibleOutlined />
          }
        /> */}
            </Form.Item>
            <Form.Item
                label="Phone number"
                name="phone"
                rules={[{ required: true, type: 'number' }]}
            >
                <Input />
            </Form.Item>
            <Form.Item
                label="Email Address"
                name="email"
                rules={[
                    {
                        type: 'email',
                        required: true,
                    },
                ]}
            >
                <Input />
            </Form.Item>
            <Form.Item
                label="Date"
                name="date"
                rules={[{ required: true, type: 'number' }]}
            >
                <Space direction="vertical">
                    <DatePicker />
                </Space>
            </Form.Item>

            <Form.Item name="radio-group" label="Radio.Group">
                <Radio.Group>
                    <Radio value="a">item 1</Radio>
                    <Radio value="b">item 2</Radio>
                    <Radio value="c">item 3</Radio>
                </Radio.Group>
            </Form.Item>
            <Form.Item name="checkbox-group" label="Checkbox.Group">
                <Checkbox.Group>
                    <Row>
                        <Col span={8}>
                            <Checkbox value="A" style={{ lineHeight: '32px' }}>
                                A
                            </Checkbox>
                        </Col>
                        <Col span={8}>
                            <Checkbox value="B" style={{ lineHeight: '32px' }} disabled>
                                B
                            </Checkbox>
                        </Col>
                        <Col span={8}>
                            <Checkbox value="C" style={{ lineHeight: '32px' }}>
                                C
                            </Checkbox>
                        </Col>
                        <Col span={8}>
                            <Checkbox value="D" style={{ lineHeight: '32px' }}>
                                D
                            </Checkbox>
                        </Col>
                        <Col span={8}>
                            <Checkbox value="E" style={{ lineHeight: '32px' }}>
                                E
                            </Checkbox>
                        </Col>
                        <Col span={8}>
                            <Checkbox value="F" style={{ lineHeight: '32px' }}>
                                F
                            </Checkbox>
                        </Col>
                    </Row>
                </Checkbox.Group>
            </Form.Item>
            <Form.Item
                name="upload"
                label="Upload"
                valuePropName="fileList"
                getValueFromEvent={normFile}
                extra="upload here"
            >
                <Upload
                    name="logo"
                    action="/upload.do"
                    listType="picture"
                    onChange={handleFileChange}
                >
                    <Button icon={<UploadOutlined />}>Click to upload</Button>
                </Upload>
            </Form.Item>
            <Form.Item name={['user', 'introduction']} label="Introduction">
                <Input.TextArea />
            </Form.Item>


            <Form.Item
                name="remember"
                valuePropName="checked"
                wrapperCol={{ offset: 8, span: 16 }}
            >
                <Checkbox>Remember me</Checkbox>
            </Form.Item>

            <Form.Item wrapperCol={{ offset: 8, span: 16 }}>
                <Button type="primary" htmlType="submit">
                    Submit
                </Button>
            </Form.Item>
            {!isValid && <p>Please enter a valid phone number for Nepal.</p>}
        </Form>
    );
};

export default FormOne;
