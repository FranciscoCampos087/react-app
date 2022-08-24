import { When } from "@cucumber/cucumber";
import { ScenarioWorld } from "./setup/world";
import { checkElement, uncheckElement } from "../support/html-behavior";
import { waitFor, waitForSelector } from "../support/wait-for-behavior";
import { getElementLocator } from "../support/web-element-helper";
import { ElementKey } from "../env/global";

When(
  /^I (check)?(uncheck)? the "([^"]*)" (?:check box|radio button|switch)$/,
  async function (
    this: ScenarioWorld,
    checked: boolean,
    unchecked: boolean,
    elementKey: ElementKey
  ) {
    const {
      screen: { page },
      globalConfig,
    } = this;

    const elementIdentifier = getElementLocator(page, elementKey, globalConfig);

    await waitFor(async () => {
      const elementStable = await waitForSelector(page, elementIdentifier);

      if (elementStable) {
        if (!!unchecked) {
          await uncheckElement(page, elementIdentifier);
        } else {
          await checkElement(page, elementIdentifier);
        }
      }

      return elementStable;
    });
  }
);
