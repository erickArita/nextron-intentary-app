import React, { useEffect, useState } from 'react';
import Head from 'next/head';
import Link from 'next/link';
import { Button, Form, Input, List } from 'antd'
import 'antd/dist/antd.css'
import { ipcRenderer } from 'electron';
import Database from '../../main/database/Database'

const tailLayout = {
    wrapperCol: { offset: 8, span: 16 },
};
Database
const layout = {
    labelCol: { span: 8 },
    wrapperCol: { span: 16 },
};
const user = 'Erick';
const Home = () => {
    const [message, setMessage] = useState({ user: user, message: '' });

    const [messages, setMessages] = useState([{
        user: ''
        , message: ''
    }]);

    const m = message.message;

    const onSubmit = (e) => {
        // e.preventDefault;
        ipcRenderer.send('set-message', message);
        setMessages([...messages, message]);
        setMessage({ ...message, message: m });
    };
    const onChange = (e) => {
        console.log(e.target.value)
        setMessage({ ...message, message: e.target.value })
    };


    useEffect(() => {

        setMessages([...messages,ipcRenderer.sendSync('get-message')]);
    }, [])

    return (
        <React.Fragment>
            <Head>
                <title>Home - Nextron (with-typescript)</title>
            </Head>
            <div>
                <p>
                    ⚡ Electron + Next.js ⚡ -
          <Link href="/next">
                        <a>Go to next page</a>
                    </Link>
                </p>
                <img src="/images/logo.png" />
            </div>
            <List
                size='small'
                dataSource={messages}
                renderItem={mess => <List.Item>{mess.message}</List.Item>}
            />
            <Form {...layout} name='form' onFinish={onSubmit} >
                <Form.Item
                    wrapperCol={{ span: 8 }}

                    label='Escribe tu mensaje'
                    name='message'
                    rules={[{ required: true, message: 'No deje el campo vacio', type: 'string' }]}
                >
                    <Input value={message.message} onChange={onChange} />
                </Form.Item>

                <Form.Item  {...tailLayout}>
                    <Button type="primary" htmlType="submit" >
                        Enviar
                    </Button>
                </Form.Item>
            </Form>
        </React.Fragment>
    );
};

export default Home;
