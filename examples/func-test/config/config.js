export default {
  routes: [
    {
      path: '/',
      component: 'IndexPage',
    },
  ],
  script: ['https://gw.alipayobjects.com/os/lib/moment/2.24.0/moment.js'],
  style: [
    'https://gw.alipayobjects.com/a/g/lark/lark-katex/0.8.1/katex.min.css',
    `
      body: {
        background: #fffff1;
      }
    `,
  ],
};
