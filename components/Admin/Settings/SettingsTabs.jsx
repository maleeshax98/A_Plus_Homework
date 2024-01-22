import { Tabs, Tab } from "@nextui-org/react";
import React from "react";

export default function SettingsTabs({ selectedTab, setSelectedTab, tablist }) {
  return (
    <div>
      <div>
        <Tabs
          aria-label="Options"
          selectedKey={selectedTab}
          onSelectionChange={setSelectedTab}
        >
          {tablist.map((tab, index) => (
            <Tab key={tab} title={tab}></Tab>
          ))}
        </Tabs>
      </div>
    </div>
  );
}
