import { Meteor } from 'meteor/meteor';

// Source: https://youtu.be/j-WcyAjVceM
async function renderAsync() {
  const [
    React,
    { hydrate },
    { default: App },
    { default: MainLayout },
  ] = await Promise.all([
    import('react'),
    import('react-dom'),
    import('../../ui/app'),
    import('../../ui/layouts/MainLayout/MainLayout'),
  ]);

  // Inject react app components into App's Shell
  hydrate(<App component={MainLayout} />, document.getElementById('root-app'));
}

Meteor.startup(() => {
  const renderStart = Date.now();
  const startupTime = renderStart - window.performance.timing.responseStart;
  console.log(`Meteor.startup took: ${startupTime}ms`);

  // Register service worker
  import('../../ui/register-sw').then(() => {});

  renderAsync().then(() => {
    const renderTime = Date.now() - renderStart;
    console.log(`renderAsync took: ${renderTime}ms`);
    console.log(`Total time: ${startupTime + renderTime}ms`);
  });
});
