import { DataTable, When } from "@cucumber/cucumber";
import { ElementKey } from "../../env/global";
import { getElementLocator } from "../../support/web-element-helper";
import { ScenarioWorld } from "../setup/world";
import { waitFor, waitForSelector } from "../../support/wait-for-behavior";
import { getTableData } from "../../support/html-behavior";

When(
  /^the "([^~]*)" table should( not)? equal the following:$/,
  async function (
    this: ScenarioWorld,
    elementKey: ElementKey,
    negate: boolean,
    dataTable: DataTable
  ) {
    const {
      screen: { page },
      globalConfig,
    } = this;

    const elementIdentifier = getElementLocator(page, elementKey, globalConfig);

    await waitFor(async () => {
      const elementStable = await waitForSelector(page, elementIdentifier);

      if (elementStable) {
        const tableData = await getTableData(page, elementIdentifier);
        return (tableData === JSON.stringify(dataTable.raw())) === !negate;
      } else {
        return elementStable;
      }
    });
  }
);
