import { Then } from "@cucumber/cucumber";
import { ScenarioWorld } from "./setup/world";
import { waitFor, waitForSelectorOnPage } from "../support/wait-for-behavior";
import { getElementLocator } from "../support/web-element-helper";
import { ElementKey } from "../env/global";
import { inputValueOnPage } from "../support/html-behavior";

Then(
  /^I fill in the "([^"]*)" input on the "([0-9]+th|[0-9]+st|[0-9]+nd|[0-9]+rd)" (?:tab|window) with "([^"]*)"$/,
  async function (
    this: ScenarioWorld,
    elementKey: ElementKey,
    elementPosition: string,
    inputValue: string
  ) {
    const {
      screen: { page, context },
      globalConfig,
    } = this;

    const pageIndex = Number(elementPosition.match(/\d/g)?.join("")) - 1;

    const elementIdentifier = getElementLocator(page, elementKey, globalConfig);

    await waitFor(async () => {
      let pages = context.pages();
      const elementStable = await waitForSelectorOnPage(
        elementIdentifier,
        pages,
        pageIndex
      );

      if (elementStable) {
        await inputValueOnPage(pages, pageIndex, elementIdentifier, inputValue);
      }

      return elementStable;
    });
  }
);
