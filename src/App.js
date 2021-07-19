import { useEffect } from "react";
import "./App.css";
import { storyViewEvent, renderWruWidget } from "./Widgets/index";
//import { storyViewEvent, renderWruWidget } from "nws18-wru-widget";
function App() {
  useEffect(() => {
    storyViewEvent({
      articleId: "3929301",
      platform: "web",
    });
    renderWruWidget({
      widgetId: "nws18-wru-widget-recommended-for-you-js",
      articleId: "3929442",
      gaTrackingId: "UA-156703-3",
      deviceType: "desktop",
    });
    renderWruWidget({
      widgetId: "nws18-wru-widget-recommended-for-you-js-1",
      articleId: "3929448",
      gaTrackingId: "UA-156703-3",
      deviceType: "desktop",
    });
    renderWruWidget({
      widgetId: "nws18-wru-widget-recommended-for-you-js-2",
      articleId: "3929404",
      gaTrackingId: "UA-156703-3",
      deviceType: "desktop",
    });
    renderWruWidget({
      widgetId: "nws18-wru-widget-recommended-for-you-js-3",
      articleId: "3929405",
      gaTrackingId: "UA-156703-3",
      deviceType: "desktop",
    });
    renderWruWidget({
      widgetId: "nws18-wru-widget-recommended-for-you-js-4",
      articleId: "3929406",
      gaTrackingId: "UA-156703-3",
      deviceType: "desktop",
    });
    renderWruWidget({
      widgetId: "nws18-wru-widget-recommended-for-you-js-5",
      articleId: "3929407",
      gaTrackingId: "UA-156703-3",
      deviceType: "desktop",
    });
    renderWruWidget({
      widgetId: "nws18-wru-widget-recommended-for-you-js-6",
      articleId: "3929408",
      gaTrackingId: "UA-156703-3",
      deviceType: "desktop",
    });
    renderWruWidget({
      widgetId: "nws18-wru-widget-recommended-for-you-js-7",
      articleId: "3929409",
      gaTrackingId: "UA-156703-3",
      deviceType: "desktop",
    });
    renderWruWidget({
      widgetId: "nws18-wru-widget-recommended-for-you-js-8",
      articleId: "3929422",
      gaTrackingId: "UA-156703-3",
      deviceType: "desktop",
    });
    renderWruWidget({
      widgetId: "nws18-wru-widget-recommended-for-you-js-9",
      articleId: "3929411",
      gaTrackingId: "UA-156703-3",
      deviceType: "desktop",
    });
    renderWruWidget({
      widgetId: "nws18-wru-widget-recommended-for-you-js-10",
      articleId: "3929412",
      gaTrackingId: "UA-156703-3",
      deviceType: "desktop",
    });
    renderWruWidget({
      widgetId: "nws18-wru-widget-recommended-for-you-js-11",
      articleId: "3929400",
      gaTrackingId: "UA-156703-3",
      deviceType: "desktop",
    });
  }, []);
  return (
    <>
      <div id="test" className="App">
        <div style={{ height: 500 }}></div>
        <div id="nws18-wru-widget-recommended-for-you-js"></div>
        <div style={{ height: 500 }}></div>
        <div id="nws18-wru-widget-recommended-for-you-js-1"></div>
        <div style={{ height: 500 }}></div>
        <div id="nws18-wru-widget-recommended-for-you-js-2"></div>
        <div style={{ height: 500 }}></div>
        <div id="nws18-wru-widget-recommended-for-you-js-3"></div>
        <div style={{ height: 500 }}></div>
        <div id="nws18-wru-widget-recommended-for-you-js-4"></div>
        <div style={{ height: 500 }}></div>
        <div id="nws18-wru-widget-recommended-for-you-js-5"></div>
        <div style={{ height: 500 }}></div>
        <div id="nws18-wru-widget-recommended-for-you-js-6"></div>
        <div style={{ height: 500 }}></div>
        <div id="nws18-wru-widget-recommended-for-you-js-7"></div>
        <div style={{ height: 500 }}></div>
        <div id="nws18-wru-widget-recommended-for-you-js-8"></div>
        <div style={{ height: 500 }}></div>
        <div id="nws18-wru-widget-recommended-for-you-js-9"></div>
        <div style={{ height: 500 }}></div>
        <div id="nws18-wru-widget-recommended-for-you-js-10"></div>
        <div style={{ height: 500 }}></div>
        <div id="nws18-wru-widget-recommended-for-you-js-11"></div>
      </div>
    </>
  );
}
export default App;