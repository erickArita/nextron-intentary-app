import React from 'react';
import Head from 'next/head';
import { Button, Form, Input, Space, } from 'antd'
import 'antd/dist/antd.css'
import { ipcRenderer } from 'electron';
import InputNumber from '../components/helpers/InputNumber'
import Link from 'next/link';

const tailLayout = {
    wrapperCol: { offset: 8, span: 16 },
};

const layout = {
    labelCol: { span: 8 },
    wrapperCol: { span: 16 },
};
interface Product {
    nombre: string;
    precio: number;
    cantidad: number;
    descripcion: string;

}
const Home = () => {

    const [form] = Form.useForm();

    const onFinish = () => {
        const { descripcion, precio, cantidad, nombre } = form.getFieldsValue();
        const data: Product = {
            descripcion
            , precio: precio.number
            , cantidad: cantidad.number
            , nombre
        }
        ipcRenderer.send('save-product', data)
        form.resetFields();
    }


    const checkPrice = (_: any, value: { number: number }) => {
        if (value.number >= 1) {
            return Promise.resolve();
        }
        return Promise.reject('El precio debería ser mayor a cero');
    };
    return (
        <>
            <Head>
                <title>Home - Nextron (with-typescript)</title>
            </Head>

            {/* <List
                size='small'
                dataSource={messages}
                renderItem={mess => <List.Item>{mess.message}</List.Item>}
            /> */}
            <Link href="/next">
                next
            </Link>
            <Form {...layout} name="control-hooks" style={{ width: "100%" }} form={form} onFinish={onFinish} >

                <Form.Item
                    wrapperCol={{ span: 8 }}

                    label='Nombre del Producto'
                    name='nombre'
                    rules={[{ required: true, message: 'No deje el campo vacio', type: 'string' }]}
                >
                    <Input />
                </Form.Item>
                <Form.Item
                    wrapperCol={{ span: 8 }}

                    label='Cantidad'
                    name='cantidad'
                    rules={[{
                        required: true, message: 'No deje el campo vacio',
                        validator: checkPrice
                    }]}

                >
                    <InputNumber />
                </Form.Item>
                <Form.Item
                    wrapperCol={{ span: 8 }}
                    // style={{ width: '100%' }}
                    label='Precio'
                    name='precio'
                    rules={[{
                        required: true, whitespace: false,
                        validator: checkPrice
                    }]}
                >
                    <InputNumber />
                </Form.Item>
                <Form.Item
                    wrapperCol={{ span: 8 }}
                    label='Descripción'
                    name='descripcion'
                    rules={[{ type: 'string', required: true, message: 'No deje el campo vacio' }]}
                >
                    <Input />
                </Form.Item>

                <Form.Item  {...tailLayout}>
                    <Button type="primary" htmlType="submit"  >
                        Enviar
                    </Button>
                </Form.Item>
            </Form>

        </>
    );
};

export default Home;
