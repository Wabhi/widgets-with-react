import {
    fetchArticleData,
    articleClickEventHandler,
    widgetViewEventHandler,
  } from './api';
  import {
    ELEMENT_CLASS_PREFIX,
    MOBILE,
    DESKTOP_ARTICLE_COUNT,
    MOBILE_ARTICLE_COUNT,
    WIDGET_DATA_KEYS,
    IMAGE_PLACEHOLDER,
    FALLBACK_IMAGE_URL,
  } from './constants';
  import Analytics from 'analytics';
  import googleAnalytics from '@analytics/google-analytics';
  import eventUtil from './utils/eventUtils';
  // widgetData = {
  //   widgetId: 'string',
  //   articleId: 'string',
  //   gaTrackingId: 'string',
  //   deviceType: 'string'
  // };
const renderWruWidget = (widgetData) => {
    //debugger
    try {
      WIDGET_DATA_KEYS.forEach((key) => {
        if (widgetData.hasOwnProperty(key)) {
          widgetData[key] = '' + widgetData[key];
        }
      });
    } catch (err) {
      console.error(err);
    }
    let WidgetSingleton = (function () {
      // isWidgetGenerated : flag to check if widget is generated in the view
      // isWidgetSeen : flag to check if widget is seen by the user
      let INSTANCE = { isWidgetGenerated: false, isWidgetSeen: false };
      function WidgetSingleton(widgetId) {
        if (!(this instanceof WidgetSingleton)) {
          return new WidgetSingleton(widgetId);
        }
        if (widgetData.gaTrackingId) {
          var analytics = Analytics({
            app: 'nws18-wru-widget',
            plugins: [
              googleAnalytics({
                trackingId: widgetData.gaTrackingId,
              }),
            ],
          });
        }
        function handleArticleClickForGA(articleDetails) {
          try {
            analytics.track('click', {
              category: 'Article Engagement Wru',
              label: `RS-${articleDetails.articleNumber}-ArticleCategory-${articleDetails.articleCategory}`,
            });
          } catch (err) {
            console.error(err);
          }
        }
        var currentData = null;
        function handleWidgetViewForGA() {
          try {
            analytics.track('impression', {
              category: 'Article Engagement Wru',
              label: currentData.Slug,
            });
          } catch (err) {
            console.error(err);
          }
        }
        const deviceType = widgetData.deviceType;
        const articleCount =
          deviceType === MOBILE ? MOBILE_ARTICLE_COUNT : DESKTOP_ARTICLE_COUNT;
        const strategy = deviceType === MOBILE ? 'n18foryoum' : 'n18foryouw';
        this.paint = () => {
          fetchArticleData(widgetData.articleId, strategy).then((data) => {
            try {
              currentData = data[0].currentData;
              const recommendations = data[0].recommendations;
              if (!document.getElementById(`${ELEMENT_CLASS_PREFIX}--styles`)) {
                let styleSheet = document.createElement('style');
                styleSheet.id = `${ELEMENT_CLASS_PREFIX}--styles`;
                styleSheet.type = 'text/css';
                styleSheet.innerText = fetchWidgetStyles(deviceType);
                document.head.appendChild(styleSheet);
              }
              let widgetHead = document.getElementById(widgetId);
              let widgetArticleContainer = document.createElement('ul');
              widgetArticleContainer.classList.add(
                `${ELEMENT_CLASS_PREFIX}--article-container`,
                'widget-v-0.19.0'
              );
              /*   Restricting number of articles to only itemsCount   */
              let itemsCount =
                recommendations.length < articleCount
                  ? recommendations.length
                  : articleCount;
              for (let i = 0; i < itemsCount; i++) {
                removeChildren(widgetHead);
                let article = document.createElement('li');
                article.classList.add(`${ELEMENT_CLASS_PREFIX}--article`);
                let articleImageContainer = document.createElement('a');
                articleImageContainer.classList.add(
                  `${ELEMENT_CLASS_PREFIX}--article-image-container`
                );
                let articleImage = document.createElement('img');
                articleImage.classList.add(
                  `${ELEMENT_CLASS_PREFIX}--article-image`,
                  'lazyload'
                );
                articleImage.setAttribute('src', IMAGE_PLACEHOLDER);
                articleImage.setAttribute(
                  'data-src',
                  recommendations[i].ImageUrl
                    ? recommendations[i].ImageUrl
                    : FALLBACK_IMAGE_URL
                );
                articleImage.setAttribute('alt', recommendations[i].Description);
                articleImage.setAttribute('width', 150);
                articleImage.setAttribute('height', 100);
                let articleTextContainer = document.createElement('div');
                articleTextContainer.classList.add(
                  `${ELEMENT_CLASS_PREFIX}--article-text-container`
                );
                let articleText = document.createElement('a');
                articleText.classList.add(
                  `${ELEMENT_CLASS_PREFIX}--article-text`
                );
                articleText.innerText = recommendations[i].Description;
                articleText.title = recommendations[i].Description;
                articleImageContainer.appendChild(articleImage);
                articleTextContainer.appendChild(articleText);
                article.appendChild(articleImageContainer);
                article.appendChild(articleTextContainer);
                widgetArticleContainer.appendChild(article);
                const openArticle = () => {
                  window.open(recommendations[i].Slug, '_self');
                };
                article.onclick = () => {
                  articleClickEventHandler(recommendations[i].Cid, strategy).then(
                    (res) => {
                      if (widgetData.gaTrackingId) {
                        handleArticleClickForGA({
                          articleNumber: i + 1,
                          articleCategory: recommendations[i].Category,
                        });
                      }
                      openArticle();
                    },
                    (e) => {
                      if (widgetData.gaTrackingId) {
                        handleArticleClickForGA({
                          articleNumber: i + 1,
                          articleCategory: recommendations[i].Category,
                        });
                      }
                      openArticle();
                    }
                  );
                };
              }
              widgetHead.appendChild(widgetArticleContainer);
            } catch (err) {
              console.error(err);
            }
          });
        };
        this.attachEvents = () => {
          const isInViewport = () => {
            // remove event listeners once widget is in viewport
            if (INSTANCE.isWidgetSeen) {
              eventUtil.removeEvent(window, 'scroll', isInViewport);
            } else {
              let widgets = document.getElementById(widgetData.widgetId);
              let position =
                widgets !== null
                  ? widgets.getBoundingClientRect()
                  : { top: 0, bottom: 0 };
              let widgetHeight = position.bottom - position.top;
              // load recommendations only when widget div is loaded
              if (widgets !== null && !INSTANCE.isWidgetGenerated) {
                INSTANCE.isWidgetGenerated = true;
                this.paint();
              }
              // position.top + 0.2 * widgetHeight
              // logic to trigger event only after first recommendation is visible
              if (
                widgetHeight > 0 &&
                position.top + 0.2 * widgetHeight < window.innerHeight &&
                position.bottom >= 0 &&
                !INSTANCE.isWidgetSeen
              ) {
                INSTANCE.isWidgetSeen = true;
                widgetViewEventHandler(widgetData.articleId);
                handleWidgetViewForGA();
              }
            }
          };
          eventUtil.addEvent(window, 'scroll', isInViewport);
        };
      }
      return {
        init: function () {
          const id = arguments[1];
          if (!INSTANCE[`${id}`]) {
            return (INSTANCE[`${id}`] = WidgetSingleton.apply(null, arguments));
          }
          return INSTANCE[`${id}`];
        },
        getInstance: function () {
          const id = arguments[1];
          if (!INSTANCE[`${id}`]) {
            const result = this.init.apply(this, arguments);
            result.attachEvents();
            return result;
          }
          INSTANCE[`${id}`].attachEvents();
          return INSTANCE[`${id}`];
        },
      };
    })();
    WidgetSingleton.getInstance(widgetData.widgetId);
  };
  const removeChildren = (node) => {
    try {
      while (node.firstChild) {
        node.removeChild(node.firstChild);
      }
    } catch (err) {
      console.error(err);
    }
  };
  const fetchWidgetStyles = (deviceType) => {
    const wruNws18DesktopStyles = `
    .${ELEMENT_CLASS_PREFIX}--article-container {
      display: flex;
      margin: unset;
      padding: unset;
      list-style: none;
    }
    .${ELEMENT_CLASS_PREFIX}--article-container li:last-child {
      border-right: none;
      padding-right: 0;
      margin-right: 0;
    }
    .${ELEMENT_CLASS_PREFIX}--article {
      box-sizing: border-box;
      width: 100%;
      display: flex;
      border-right: 1px dashed #707070;
      padding-left: 16px;
      padding-right: 20px;
      margin-right: 20px;
      margin-bottom: 10px;
    }
    .${ELEMENT_CLASS_PREFIX}--article-image-container {
      min-width: 180px;
      width: 180px;
      height: 120px;
      margin-right: 24px;
      background: #e6e6e6;;
      border-top-right-radius:30px;
      border-bottom-left-radius:30px;
      transition: all .5s ease-in-out;
    }
    .${ELEMENT_CLASS_PREFIX}--article-image-container:hover{
      background:#9be5dc;
      transform: scale(1.2); 
    }
    .${ELEMENT_CLASS_PREFIX}--article-image-container, .${ELEMENT_CLASS_PREFIX}--article-text-container {
      cursor: pointer;
    }
    .${ELEMENT_CLASS_PREFIX}--article-text-container {
      text-align: left;
      color: #de9c38;
      font-size: 16px;
      line-height: 34px; 
      font-weight: 700;
    }
    .${ELEMENT_CLASS_PREFIX}--article-image {
      max-width: 180px;
      max-height: 120px;
      width: 100%;
      height: 100%;
    }
  `;
    const wruNws18MobileStyles = `
    .${ELEMENT_CLASS_PREFIX}--article-container {
      display: flex;
      justify-content: center;
      margin: unset;
      padding: unset;
      list-style: none;
    }
    .${ELEMENT_CLASS_PREFIX}--article {
      box-sizing: border-box;
      display: flex;
      flex-direction: column;
      width: 170px;
      padding: 0 10px;
      margin-bottom: 10px;
      min-height: 24px;
    }
    .${ELEMENT_CLASS_PREFIX}--article-image-container, .${ELEMENT_CLASS_PREFIX}--article-text-container {
      cursor: pointer;
    }
    .${ELEMENT_CLASS_PREFIX}--article-image-container {
      height: 100px;
      margin-bottom: 5px;
      background: #e6e6e6;
    }
    .${ELEMENT_CLASS_PREFIX}--article-text-container {
      text-align: left;
      color: #707070;
      font-size: 13px;
      line-height: 16px;
      font-weight: 500;
    }
    .${ELEMENT_CLASS_PREFIX}--article-image {
      max-width: 150px;
      max-height: 100px;
      width: 100%;
      height: 100%;
      display: block;
    }
  `;
    return deviceType === MOBILE ? wruNws18MobileStyles : wruNws18DesktopStyles;
  };
  export default renderWruWidget;