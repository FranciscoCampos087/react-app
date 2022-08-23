import { Then } from "@cucumber/cucumber";
import { getElementLocator } from '../../support/web-element-helper'
import { ScenarioWorld } from "../setup/world";
import { waitFor } from "../../support/wait-for-behavior";

Then(
	/^the "([^~]*)" (?:check box|radio button|switch) should( not)? be checked$/,
	async function(this: ScenarioWorld, elementKey: string, negate: boolean) {
		const {
			screen: { page },
			globalConfig
		} = this;

		const elementIdentifier = getElementLocator(page, elementKey, globalConfig)

		await waitFor(async () => {
			const isElementChecked = await page.isChecked(elementIdentifier)
			return isElementChecked === !negate
		})
	}
)
