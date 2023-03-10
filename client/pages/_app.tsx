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
        <meta name='description' content='MyFin - Personal Finance Planner' />
        <link rel='icon' href='/favicon.ico' />
        <meta property='og:title' content='MyFin' />
        <meta property='og:type' content='website' />
        <meta property='og:url' content='https://www.myfinapi.dev' />
        <meta property='og:image' content='/social-image.jpg' />
        <meta
          property='og:description'
          content='MyFin - Personal Finance Plannig made easy.'
        />
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
