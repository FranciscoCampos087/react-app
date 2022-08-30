import { Then } from "@cucumber/cucumber";
import { ScenarioWorld } from "./setup/world";
import {
  waitFor,
  waitForResult,
  waitForSelector,
} from "../support/wait-for-behavior";
import { getElementLocator } from "../support/web-element-helper";
import { ElementKey } from "../env/global";
import { getElementText } from "../support/html-behavior";

Then(
  /^I retrieve the "([^"]*)" text and store it as "([^"]*)" in global variables$/,
  async function (
    this: ScenarioWorld,
    elementKey: ElementKey,
    variableKey: string
  ) {
    const {
      screen: { page },
      globalConfig,
      globalVariables,
    } = this;

    const elementIdentifier = getElementLocator(page, elementKey, globalConfig);

    await waitFor(
      async () => {
        const elementStable = await waitForSelector(page, elementIdentifier);

        if (elementStable) {
          const elementText = await getElementText(page, elementIdentifier);

          if (elementText != null) {
            globalVariables[variableKey] = elementText;
            return waitForResult.PASS;
          }
        }

        return waitForResult.ELEMENT_NOT_AVAILABLE;
      },

      globalConfig,
      { target: elementKey }
    );
  }
);
