import { ipcRenderer } from 'electron';
import React, { useEffect, useState } from 'react';
import Head from 'next/head';
import { Button, Form, Input, Table } from 'antd'
import 'antd/dist/antd.css'
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
};

const Home = () => {

  const [form] = Form.useForm();
  const [products, setProducts] = useState([])
  const onFinish = () => {
    const { descripcion, precio, cantidad, nombre } = form.getFieldsValue();
    const data: Product = {
      descripcion,
      precio: precio.number,
      cantidad: cantidad.number,
      nombre,
    }
    ipcRenderer.invoke('saveProduct', data)
    ipcRenderer.invoke('getProduct',{})
    form.resetFields();
  }
  useEffect(() => {
    ipcRenderer.on('saveProduct', (e, args) => {
      console.log(args, 'algo del main save')
    })
    return () => {
      ipcRenderer.removeAllListeners('saveProduct')
    }

  }, [])

  useEffect(() => {
    ipcRenderer.invoke('getProduct')
    ipcRenderer.on('getProduct', (e, args) => {
      setProducts([...args])
    })
    return () => {
      ipcRenderer.removeAllListeners('getProduct')
    }

  }, [])

  const checkPrice = (_: any, value: { number: number }) => {
    if (value.number >= 1) {
      return Promise.resolve();
    }
    return Promise.reject('El precio debería ser mayor a cero');
  };
  const columns = ['Nombre', 'Cantidad', 'Precio', 'Descripcion']
  const tableColums = columns.map((e, i) => ({
    title: e,
    dataIndex: e.toLowerCase(),
    key: e.toLowerCase(),
  }))
  console.log(products);

  return (
    <>
      <Head>
        <title>Home - Nextron (with-typescript)</title>
      </Head>
      <div className="container">
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

        <Table dataSource={products}   columns={tableColums}  style={{ width: '100%' }} />
        <style jsx>{`
        .container{
          display: flex;
          justify-content: space-between;
          align-items: center;
          height: 100vh;
          margin: 0rem 1.3rem ;
          box-sizing: border-box;
        }
        `}</style>
      </div>
    </>
  );
};

export default Home;
