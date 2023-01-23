import '../styles/globals.css';
import React, { useContext, useEffect } from 'react';
import Head from 'next/head';
import type { AppProps, NextWebVitalsMetric } from 'next/app';
import BaseLayout from '@modules/common/components/Layouts/Base-Layout';
import BuildClient from './api/build-client';
import { currentUserProps } from '@modules/common/types/types-interfaces';
import axios from 'axios';
import { NextPageContext } from 'next';

interface CustomProps extends AppProps {
  currentUser?: currentUserProps;
}

export default function App({
  Component,
  pageProps,
  currentUser,
}: CustomProps) {
  return (
    <BaseLayout currentUser={currentUser}>
      <Head>
        <title>My Fin - Personal Finance Planner</title>
      </Head>
      <Component {...pageProps} currentUser={currentUser} />
    </BaseLayout>
  );
}
App.getInitialProps = async (appContext: any) => {
  const client = BuildClient(appContext.ctx);
  const { data } = await client.get('/api/users/currentuser');
  let pageProps = {};
  if (appContext.Component.getInitialProps) {
    pageProps = await appContext.Component.getInitialProps(
      appContext.ctx,
      client,
      data.currentUser
    );
  }

  return { pageProps, ...data };
};

/*
 App.getInitialProps = async (appContext: any) => {

   console.log(appContext.ctx.req.cookies)
   

  const { data } = await axios.get(
    `${process.env.NEXT_PUBLIC_API_URL}api/users/currentuser`,
    { withCredentials: true }
  );

  let pageProps = {};
  if (appContext.Component.getInitialProps) {
    pageProps = await appContext.Component.getInitialProps(
      appContext.ctx,
      data.currentUser
    );
  }

  return { pageProps, ...data };
};
*/
