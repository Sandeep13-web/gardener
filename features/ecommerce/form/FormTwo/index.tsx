import { Button, Checkbox, DatePicker, Form, Input, InputNumber, Radio, Select, Upload } from 'antd';

const { Option } = Select;
const { Dragger } = Upload;

const FormTwo = () => {
    const onFinish = (values: any) => {
        console.log('Received values:', values);
    };

    const handleFileUpload = (file: any) => {
        console.log('Uploaded file:', file);
    };

    const validateFileSize = (file: any) => {
        const maxSize = 200 * 1024 * 1024; // 200MB
        const fileSize = file.size;
        if (fileSize > maxSize) {
            throw new Error('File size must be within 200MB');
        }
        return fileSize;
    };


    // Custom phone number validation function
    const validatePhoneNumber = (_: any, value: any) => {
        // Phone number must only contain numeric characters
        const regex = /^[0-9]+$/;
        if (!regex.test(value)) {
            return Promise.reject('Phone number must contain only digits');
        }
        return Promise.resolve();
    };


    const validateName = (_: any, value: any) => {
        const regex = /^[a-zA-Z\s]*$/;
        if (!regex.test(value)) {
            throw new Error('Invalid characters in the name');
        }
        return Promise.resolve();
    };

    return (
        <Form
            name="myForm"
            onFinish={onFinish}
            labelCol={{ span: 8 }}
            wrapperCol={{ span: 16 }}
        >
            <Form.Item
                label="First Name"
                name="firstName"
                rules={[{ required: true, message: 'Please enter your first name' },
                { validator: validateName },
                ]}
            >
                <Input />
            </Form.Item>

            <Form.Item
                label="Last Name"
                name="lastName"
                rules={[{ required: true, message: 'Please enter your last name' }]}
            >
                <Input />
            </Form.Item>

            <Form.Item
                label="Password"
                name="password"
                rules={[{ required: true, message: 'Please enter your password' }]}
            >
                <Input.Password />
            </Form.Item>
            <Form.Item
                label="Phone Number"
                name="phoneNumber"
                rules={[{ required: true, message: 'Please enter your phone number' }]}
            >
                <InputNumber style={{ width: '100%' }} />
            </Form.Item>

            <Form.Item
                label="Email Address"
                name="email_address"
                rules={[
                    { required: true, message: 'Please enter your email address' },
                    { type: 'email', message: 'Please enter a valid email address' },
                ]}
            >
                <Input />
            </Form.Item>

            <Form.Item
                label="Date of Birth"
                name="dob"
                rules={[{ required: true, message: 'Please select your date of birth' }]}
            >
                <DatePicker />
            </Form.Item>

            <Form.Item
                label="Gender"
                name="gender"
                rules={[{ required: true, message: 'Please select your gender' }]}
            >
                <Radio.Group>
                    <Radio value="male">Male</Radio>
                    <Radio value="female">Female</Radio>
                    <Radio value="other">Other</Radio>
                </Radio.Group>
            </Form.Item>

            <Form.Item
                label="Hobbies"
                name="hobbies"
                rules={[{ required: true, message: 'Please select at least one hobby' }]}
            >
                <Checkbox.Group>
                    <Checkbox value="football">Football</Checkbox>
                    <Checkbox value="basketball">Basketball</Checkbox>
                </Checkbox.Group>
            </Form.Item>

            <Form.Item
                label="File Upload (Max 200MB)"
                name="file"
                rules={[
                    { required: true, message: 'Please upload a file' },
                    { validator: (_, file) => validateFileSize(file) },
                ]}
            >
                <Dragger
                    beforeUpload={() => false}
                    onChange={(info) => handleFileUpload(info.file)}
                >
                    <p className="ant-upload-drag-icon">+</p>
                    <p className="ant-upload-text">Click or drag file to this area</p>
                    <p className="ant-upload-hint">Maximum size: 200MB</p>
                </Dragger>
            </Form.Item>

            <Form.Item
                name="image"
                label="Upload Image (Max 100MB)"
                rules={[
                    { required: true, message: 'Please upload an image' },
                    {
                        validator: (_, file) => {
                            if (file.size / 1024 / 1024 <= 100) {
                                return Promise.resolve();
                            }
                            return Promise.reject('Image size must be within 100MB');
                        },
                    },
                ]}
            >
                <Upload >
                    <Button>Click to Upload</Button>
                </Upload>
            </Form.Item>

            <Form.Item
                name="remember"
                valuePropName="checked"
                wrapperCol={{ offset: 8, span: 16 }}
            >
                <Checkbox>Remember me</Checkbox>
            </Form.Item>

            <Form.Item
                label="Description"
                name="description"
                rules={[{ required: true, message: 'Please enter a description' }]}
            >
                <Input.TextArea rows={4} />
            </Form.Item>

            <Form.Item wrapperCol={{ offset: 8, span: 16 }}>
                <Button type="primary" htmlType="submit">
                    Submit
                </Button>
            </Form.Item>
        </Form>
    );
};

export default FormTwo;
