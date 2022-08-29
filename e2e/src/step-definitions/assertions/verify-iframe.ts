import { Then } from "@cucumber/cucumber";
import {
  waitFor,
  waitForSelectorInIframe,
} from "../../support/wait-for-behavior";
import {
  getElementWithinIframe,
  getIframeElement,
  getTextWithinIframeElement,
} from "../../support/html-behavior";
import { getElementLocator } from "../../support/web-element-helper";
import { ScenarioWorld } from ".././setup/world";
import { ElementKey } from "../../env/global";

Then(
  /^the "([^"]*)" on the "([^"]*)" iframe should( not)? be displayed$/,
  async function (
    this: ScenarioWorld,
    elementKey: ElementKey,
    iframeName: string,
    negate: boolean
  ) {
    const {
      screen: { page },
      globalConfig,
    } = this;

    const elementIdentifier = getElementLocator(page, elementKey, globalConfig);
    const iframeIdentifier = getElementLocator(page, iframeName, globalConfig);

    await waitFor(
      async () => {
        const elementIframe = await getIframeElement(page, iframeIdentifier);

        if (elementIframe) {
          const elementStable = await waitForSelectorInIframe(
            elementIframe,
            elementIdentifier
          );

          if (elementStable) {
            const isElementVisible =
              (await getElementWithinIframe(
                elementIframe,
                elementIdentifier
              )) != null;
            return isElementVisible === !negate;
          } else {
            return elementStable;
          }
        }
      },
      globalConfig,
      { target: elementKey }
    );
  }
);

Then(
  /^the "([^"]*)" on the "([^"]*)" iframe should( not)? contain the text "([^"]*)"$/,
  async function (
    this: ScenarioWorld,
    elementKey: ElementKey,
    iframeName: string,
    negate: boolean,
    expectedElementText: string
  ) {
    const {
      screen: { page },
      globalConfig,
    } = this;

    const elementIdentifier = getElementLocator(page, elementKey, globalConfig);
    const iframeIdentifier = getElementLocator(page, iframeName, globalConfig);

    await waitFor(
      async () => {
        const elementIframe = await getIframeElement(page, iframeIdentifier);

        if (elementIframe) {
          const elementStable = await waitForSelectorInIframe(
            elementIframe,
            elementIdentifier
          );

          if (elementStable) {
            const elementText = await getTextWithinIframeElement(
              elementIframe,
              elementIdentifier
            );
            return elementText?.includes(expectedElementText) === !negate;
          } else {
            return elementStable;
          }
        }
      },
      globalConfig,
      { target: elementKey }
    );
  }
);

Then(
  /^the "([^"]*)" on the "([^"]*)" iframe should( not)? equal the text "([^"]*)"$/,
  async function (
    this: ScenarioWorld,
    elementKey: ElementKey,
    iframeName: string,
    negate: boolean,
    expectedElementText: string
  ) {
    const {
      screen: { page },
      globalConfig,
    } = this;

    const elementIdentifier = getElementLocator(page, elementKey, globalConfig);
    const iframeIdentifier = getElementLocator(page, iframeName, globalConfig);

    await waitFor(
      async () => {
        const elementIframe = await getIframeElement(page, iframeIdentifier);

        if (elementIframe) {
          const elementStable = await waitForSelectorInIframe(
            elementIframe,
            elementIdentifier
          );

          if (elementStable) {
            const elementText = await getTextWithinIframeElement(
              elementIframe,
              elementIdentifier
            );
            return (elementText === expectedElementText) === !negate;
          } else {
            return elementStable;
          }
        }
      },
      globalConfig,
      { target: elementKey }
    );
  }
);
