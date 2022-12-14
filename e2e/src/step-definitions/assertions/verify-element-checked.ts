import { Then } from "@cucumber/cucumber";
import { getElementLocator } from "../../support/web-element-helper";
import { ScenarioWorld } from "../setup/world";
import {
  waitFor,
  waitForResult,
  waitForSelector,
} from "../../support/wait-for-behavior";
import { elementChecked } from "../../support/html-behavior";

Then(
  /^the "([^~]*)" (?:check box|radio button|switch) should( not)? be checked$/,
  async function (this: ScenarioWorld, elementKey: string, negate: boolean) {
    const {
      screen: { page },
      globalConfig,
    } = this;

    const elementIdentifier = getElementLocator(page, elementKey, globalConfig);

    await waitFor(
      async () => {
        const elementStable = await waitForSelector(page, elementIdentifier);

        if (elementStable) {
          const isElementChecked = await elementChecked(
            page,
            elementIdentifier
          );

          if (isElementChecked === !negate) {
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
        failureMessage: `Expected ${elementKey} to ${
          negate ? "not " : ""
        }be checked`,
      }
    );
  }
);
