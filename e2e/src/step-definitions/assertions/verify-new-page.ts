import { Then } from "@cucumber/cucumber";
import {
  waitFor,
  waitForResult,
  waitForSelectorOnPage,
} from "../../support/wait-for-behavior";
import { getElementLocator } from "../../support/web-element-helper";
import { ScenarioWorld } from ".././setup/world";
import { ElementKey } from "../../env/global";
import {
  getElemenhtOnPage,
  getElementTextWithinPage,
  getTitleWithinPage,
} from "../../support/html-behavior";

Then(
  /^the "([0-9]+th|[0-9]+st|[0-9]+nd|[0-9]+rd)" (?:tab|window) should( not)? contain the title "([^"]*)"$/,
  async function (
    this: ScenarioWorld,
    elementPosition: string,
    negate: boolean,
    expectedTitle: string
  ) {
    const {
      screen: { page, context },
      globalConfig,
    } = this;

    const pageIndex = Number(elementPosition.match(/\d/g)?.join("")) - 1;

    //Should be the only waitForTimeout in the code because there's no native way to assert correctly on a new tab
    await page.waitForTimeout(2000);

    await waitFor(
      async () => {
        let pages = context.pages();
        const pageTitle = await getTitleWithinPage(pages, pageIndex);

        if (pageTitle?.includes(expectedTitle) === !negate) {
          return waitForResult.PASS;
        } else {
          return waitForResult.ELEMENT_NOT_AVAILABLE;
        }
      },

      globalConfig,
      {
        target: expectedTitle,
        failureMessage: `Expected page to ${
          negate ? "not " : ""
        }contain the title ${expectedTitle}`,
      }
    );
  }
);

Then(
  /^the "([^"]*)" on the "([0-9]+th|[0-9]+st|[0-9]+nd|[0-9]+rd)" (?:tab|window) should( not)? be displayed$/,
  async function (
    this: ScenarioWorld,
    elementKey: ElementKey,
    elementPosition: string,
    negate: boolean
  ) {
    const {
      screen: { page, context },
      globalConfig,
    } = this;

    const pageIndex = Number(elementPosition.match(/\d/g)?.join("")) - 1;

    const elementIdentifier = getElementLocator(page, elementKey, globalConfig);

    await waitFor(
      async () => {
        let pages = context.pages();
        const isElementVisible =
          (await getElemenhtOnPage(elementIdentifier, pages, pageIndex)) !=
          null;

        if (isElementVisible === !negate) {
          return waitForResult.PASS;
        } else {
          return waitForResult.ELEMENT_NOT_AVAILABLE;
        }
      },

      globalConfig,
      {
        target: elementKey,
        failureMessage: `Expected ${elementKey} on page to ${
          negate ? "not " : ""
        }be displayed`,
      }
    );
  }
);

Then(
  /^the "([^"]*)" on the "([0-9]+th|[0-9]+st|[0-9]+nd|[0-9]+rd)" (?:tab|window) should( not)? contain the text "([^"]*)"$/,
  async function (
    this: ScenarioWorld,
    elementKey: ElementKey,
    elementPosition: string,
    negate: boolean,
    expectedElementText: string
  ) {
    const {
      screen: { page, context },
      globalConfig,
    } = this;

    const pageIndex = Number(elementPosition.match(/\d/g)?.join("")) - 1;

    const elementIdentifier = getElementLocator(page, elementKey, globalConfig);

    await waitFor(
      async () => {
        let pages = context.pages();

        const elementStable = await waitForSelectorOnPage(
          elementIdentifier,
          pages,
          pageIndex
        );

        if (elementStable) {
          const elementText = await getElementTextWithinPage(
            elementIdentifier,
            pages,
            pageIndex
          );

          if (elementText?.includes(expectedElementText) === !negate) {
            return waitForResult.PASS;
          } else {
            return waitForResult.FAIL;
          }
        } else {
          return waitForResult.ELEMENT_NOT_AVAILABLE;
        }
      },

      globalConfig,
      {
        target: elementKey,
        failureMessage: `Expected ${elementKey} on page to ${
          negate ? "not " : ""
        }contain the text ${expectedElementText}`,
      }
    );
  }
);

Then(
  /^the "([^"]*)" on the "([0-9]+th|[0-9]+st|[0-9]+nd|[0-9]+rd)" (?:tab|window) should( not)? equal the text "([^"]*)"$/,
  async function (
    this: ScenarioWorld,
    elementKey: ElementKey,
    elementPosition: string,
    negate: boolean,
    expectedElementText: string
  ) {
    const {
      screen: { page, context },
      globalConfig,
    } = this;

    const pageIndex = Number(elementPosition.match(/\d/g)?.join("")) - 1;

    const elementIdentifier = getElementLocator(page, elementKey, globalConfig);

    await waitFor(
      async () => {
        let pages = context.pages();

        const elementStable = await waitForSelectorOnPage(
          elementIdentifier,
          pages,
          pageIndex
        );

        if (elementStable) {
          const elementText = await getElementTextWithinPage(
            elementIdentifier,
            pages,
            pageIndex
          );

          if ((elementText === expectedElementText) === !negate) {
            return waitForResult.PASS;
          } else {
            return waitForResult.FAIL;
          }
        } else {
          return waitForResult.ELEMENT_NOT_AVAILABLE;
        }
      },

      globalConfig,
      {
        target: elementKey,
        failureMessage: `Expected ${elementKey} on page to ${
          negate ? "not " : ""
        }equal the text ${expectedElementText}`,
      }
    );
  }
);
