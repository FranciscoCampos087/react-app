import { Then } from '@cucumber/cucumber'
import { waitFor } from '../../support/wait-for-behavior'
import { getElementLocator } from '../../support/web-element-helper'
import { ScenarioWorld } from '.././setup/world'
import { ElementKey } from '../../env/global'


Then(
    /^the "([0-9]+th|[0-9]+st|[0-9]+nd|[0-9]+rd)" (?:tab|window) should( not)? contain the title "([^"]*)"$/,
	async function(this: ScenarioWorld, elementPosition: string, negate: boolean, expectedTitle: string) {
		const {
			screen: { page, context },
		} = this;

        const pageIndex = Number(elementPosition.match(/\d/g)?.join('')) -1

        //Should be the only waitForTimeout in the code because there's no native way to assert correctly on a new tab
        await page.waitForTimeout(2000)

		await waitFor(async () => {
			let pages = context.pages()
            const pageTitle = await pages[pageIndex].title()
            return pageTitle?.includes(expectedTitle) === !negate
		})
	}
)

Then(
    /^the "([^"]*)" on the "([0-9]+th|[0-9]+st|[0-9]+nd|[0-9]+rd)" (?:tab|window) should( not)? be displayed$/,
	async function(this: ScenarioWorld, elementKey: ElementKey, elementPosition: string, negate: boolean) {
		const {
			screen: { page, context },
			globalConfig
		} = this;

        const pageIndex = Number(elementPosition.match(/\d/g)?.join('')) -1

        const elementIdentifier = getElementLocator(page, elementKey, globalConfig)

		await waitFor(async () => {
			let pages = context.pages()
            const isElementVisible = (await pages[pageIndex].$(elementIdentifier)) != null
            return isElementVisible === !negate
		})
	}
)

Then(
    /^the "([^"]*)" on the "([0-9]+th|[0-9]+st|[0-9]+nd|[0-9]+rd)" (?:tab|window) should( not)? contain the text "([^"]*)"$/,
	async function(this: ScenarioWorld, elementKey: ElementKey, elementPosition: string, negate: boolean, expectedElementText: string) {
		const {
			screen: { page, context },
			globalConfig
		} = this;

        const pageIndex = Number(elementPosition.match(/\d/g)?.join('')) -1

        const elementIdentifier = getElementLocator(page, elementKey, globalConfig)

		await waitFor(async () => {
			let pages = context.pages()
            const elementText = await pages[pageIndex].textContent(elementIdentifier)
            return elementText?.includes(expectedElementText) === !negate
		})
	}
)

Then(
    /^the "([^"]*)" on the "([0-9]+th|[0-9]+st|[0-9]+nd|[0-9]+rd)" (?:tab|window) should( not)? equal the text "([^"]*)"$/,
	async function(this: ScenarioWorld, elementKey: ElementKey, elementPosition: string, negate: boolean, expectedElementText: string) {
		const {
			screen: { page, context },
			globalConfig
		} = this;

        const pageIndex = Number(elementPosition.match(/\d/g)?.join('')) -1

        const elementIdentifier = getElementLocator(page, elementKey, globalConfig)

		await waitFor(async () => {
			let pages = context.pages()
            const elementText = await pages[pageIndex].textContent(elementIdentifier)
            return (elementText === expectedElementText) === !negate
		})
	}
)
