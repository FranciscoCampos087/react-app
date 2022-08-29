import { Then } from "@cucumber/cucumber";
import { ScenarioWorld } from "./setup/world";
import { waitFor, waitForSelector } from "../support/wait-for-behavior";
import { getElementLocator } from "../support/web-element-helper";
import { ElementKey } from "../env/global";
import { scrollElementIntoView } from "../support/html-behavior";

Then(
  /^I scroll to the "([^"]*)"$/,
  async function (this: ScenarioWorld, elementKey: ElementKey) {
    const {
      screen: { page },
      globalConfig,
    } = this;

    const elementIdentifier = getElementLocator(page, elementKey, globalConfig);

    await waitFor(
      async () => {
        const elementStable = await waitForSelector(page, elementIdentifier);

        if (elementStable) {
          await scrollElementIntoView(page, elementIdentifier);
        }

        return elementStable;
      },
      globalConfig,
      { target: elementKey }
    );
  }
);
