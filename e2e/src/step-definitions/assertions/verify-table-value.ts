import { DataTable, When } from "@cucumber/cucumber";
import { ElementKey } from "../../env/global";
import { getElementLocator } from '../../support/web-element-helper'
import { ScenarioWorld } from "../setup/world";
import { waitFor } from "../../support/wait-for-behavior";

When(
  /^the "([^~]*)" table should( not)? equal the following:$/,
  async function(this: ScenarioWorld, elementKey: ElementKey, negate: boolean, dataTable: DataTable) {
    const {
        screen: { page },
        globalConfig
    } = this;

    const elementIdentifier = getElementLocator(page, elementKey, globalConfig)

    await waitFor(async () => {
      const dataBefore = await page.$$eval(elementIdentifier+" tbody tr", (rows => {
        return rows.map(row => {
          const cells = row.querySelectorAll('td')
          return Array.from(cells).map(cell => cell.textContent)
        })
      }))

      return JSON.stringify(dataBefore) === JSON.stringify(dataTable.raw()) === !negate
    })
  }
)
