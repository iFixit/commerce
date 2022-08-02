const urls = [
   `https://www.ifixit.com/Parts/Amazon_Kindle_Oasis_(1st_Gen)/Screens`,
   `https://www.ifixit.com/Parts/Apple_Smartwatch/Buttons`,
   `https://www.ifixit.com/Parts/Asus_Laptop/SD_Card_Slots`,
   `https://www.ifixit.com/Parts/Dell_Latitude_E5270/Batteries`,
   `https://www.ifixit.com/Parts/Dell_Latitude_E5570/Batteries`,
   `https://www.ifixit.com/Parts/DJI_Spark/Batteries`,
   `https://www.ifixit.com/Parts/DJI_Spark/Motherboards`,
   `https://www.ifixit.com/Parts/Dyson_DC34/Batteries`,
   `https://www.ifixit.com/Parts/Dyson_DC35/Batteries`,
   `https://www.ifixit.com/Parts/Dyson_DC59/Batteries`,
   `https://www.ifixit.com/Parts/Fitbit_Charge_5/Screens`,
   `https://www.ifixit.com/Parts/Fitbit_Sense/Screens`,
   `https://www.ifixit.com/Parts/Fitbit_Smartwatch/Batteries`,
   `https://www.ifixit.com/Parts/Fitbit_Versa_3/Screens`,
   `https://www.ifixit.com/Parts/Garmin_Edge_Explore_820/Batteries`,
   `https://www.ifixit.com/Parts/Google_Phone/Buttons`,
   `https://www.ifixit.com/Parts/Google_Phone/Microphones`,
   `https://www.ifixit.com/Parts/Google_Phone/SIM`,
   `https://www.ifixit.com/Parts/Google_Pixel_3a/Buttons`,
   `https://www.ifixit.com/Parts/Google_Pixel_5a/Screens`,
   `https://www.ifixit.com/Parts/Google_Pixel_6/Screens`,
   `https://www.ifixit.com/Parts/HP_EliteBook_745_G5/Batteries`,
   `https://www.ifixit.com/Parts/HP_EliteBook_830_G5/Batteries`,
   `https://www.ifixit.com/Parts/HP_EliteBook_840_G5/Batteries`,
   `https://www.ifixit.com/Parts/HP_EliteBook_850_G1/Batteries`,
   `https://www.ifixit.com/Parts/HP_EliteBook_850_G6/Batteries`,
   `https://www.ifixit.com/Parts/HP_Laptop/Case_Components`,
   `https://www.ifixit.com/Parts/HP_ZBook_15U_G5/Batteries`,
   `https://www.ifixit.com/Parts/HTC_U11_Life/Batteries`,
   `https://www.ifixit.com/Parts/iMac/Graphics_Cards`,
   `https://www.ifixit.com/Parts/iMac/Logic_Boards`,
   `https://www.ifixit.com/Parts/iMac/Power_Supplies`,
   `https://www.ifixit.com/Parts/iMac/SSD_Upgrade_Kits`,
   `https://www.ifixit.com/Parts/iMac_Intel_21.5"_EMC_2805/SSD_Upgrade_Kits`,
   `https://www.ifixit.com/Parts/iMac_Intel_24"/Power_Supplies`,
   `https://www.ifixit.com/Parts/iMac_Intel_27"/Logic_Boards`,
   `https://www.ifixit.com/Parts/iPad/Logic_Boards`,
   `https://www.ifixit.com/Parts/iPad_Air/Batteries`,
   `https://www.ifixit.com/Parts/iPad_Air/Logic_Boards`,
   `https://www.ifixit.com/Parts/iPad_Air_2/Logic_Boards`,
   `https://www.ifixit.com/Parts/iPad_Air_3/Batteries`,
   `https://www.ifixit.com/Parts/iPad_Air_3/Screens`,
   `https://www.ifixit.com/Parts/iPad_Air_4/Batteries`,
   `https://www.ifixit.com/Parts/iPad_Air_4/Screens`,
   `https://www.ifixit.com/Parts/iPad_Mini_5/Screens`,
   `https://www.ifixit.com/Parts/iPad_Pro/Lightning_Connector`,
   `https://www.ifixit.com/Parts/iPad_Pro/Logic_Boards`,
   `https://www.ifixit.com/Parts/iPad_Pro_10.5"/Batteries`,
   `https://www.ifixit.com/Parts/iPad_Pro_12.9"/Batteries`,
   `https://www.ifixit.com/Parts/iPad_Pro_12.9"/Batteries`,
   `https://www.ifixit.com/Parts/iPad_Pro_12.9"/Lightning_Connector`,
   `https://www.ifixit.com/Parts/iPad_Pro_12.9"/Logic_Boards`,
   `https://www.ifixit.com/Parts/iPad_Pro_12.9"/Screens`,
   `https://www.ifixit.com/Parts/iPad_Pro_12.9"_4th_Gen/Screens`,
   `https://www.ifixit.com/Parts/iPad_Pro_9.7"/Batteries`,
   `https://www.ifixit.com/Parts/iPhone/Logic_Boards`,
   `https://www.ifixit.com/Parts/iPhone_11/Adhesive_Strips`,
   `https://www.ifixit.com/Parts/iPhone_11/Buttons`,
   `https://www.ifixit.com/Parts/iPhone_11/Lightning_Connector`,
   `https://www.ifixit.com/Parts/iPhone_11_Pro/Antennas`,
   `https://www.ifixit.com/Parts/iPhone_11_Pro_Max/Antennas`,
   `https://www.ifixit.com/Parts/iPhone_12_Pro_Max/Batteries`,
   `https://www.ifixit.com/Parts/iPhone_12_Pro_Max/Lightning_Connector`,
   `https://www.ifixit.com/Parts/iPhone_6/Microphones`,
   `https://www.ifixit.com/Parts/iPhone_6s/Logic_Boards`,
   `https://www.ifixit.com/Parts/iPhone_7/Batteries`,
   `https://www.ifixit.com/Parts/iPhone_7/Logic_Boards`,
   `https://www.ifixit.com/Parts/iPhone_7_Plus/Logic_Boards`,
   `https://www.ifixit.com/Parts/iPhone_SE/Batteries`,
   `https://www.ifixit.com/Parts/iPhone_X/Lightning_Connector`,
   `https://www.ifixit.com/Parts/iPhone_XR/Antennas`,
   `https://www.ifixit.com/Parts/iPhone_XS/Lightning_Connector`,
   `https://www.ifixit.com/Parts/iPhone_XS/Logic_Boards`,
   `https://www.ifixit.com/Parts/iPhone_XS_Max/Lightning_Connector`,
   `https://www.ifixit.com/Parts/iPhone_XS_Max/Logic_Boards`,
   `https://www.ifixit.com/Parts/iPhone_XS_Max/Microphones`,
   `https://www.ifixit.com/Parts/JBL_XTREME/Batteries`,
   `https://www.ifixit.com/Parts/Lenovo_Laptop/Case_Components`,
   `https://www.ifixit.com/Parts/Lenovo_Legion_Y540-17IRH/Batteries`,
   `https://www.ifixit.com/Parts/Lenovo_ThinkPad_T470/Batteries`,
   `https://www.ifixit.com/Parts/Lenovo_ThinkPad_T480/Batteries`,
   `https://www.ifixit.com/Parts/Lenovo_ThinkPad_X1_Carbon_(2nd_Gen)/Batteries`,
   `https://www.ifixit.com/Parts/Lenovo_ThinkPad_X380_Yoga/Batteries`,
   `https://www.ifixit.com/Parts/Lenovo_Yoga_720/Batteries`,
   `https://www.ifixit.com/Parts/Lenovo_Yoga_910-13IKB/Motherboards`,
   `https://www.ifixit.com/Parts/Logitech_UE_MegaBoom`,
   `https://www.ifixit.com/Parts/Mac_Mini/Case_Components`,
   `https://www.ifixit.com/Parts/Mac_Mini/Logic_Boards`,
   `https://www.ifixit.com/Parts/Mac_Mini/Power_Supplies`,
   `https://www.ifixit.com/Parts/Mac_Mini_Unibody/Hard_Drives_(SATA)`,
   `https://www.ifixit.com/Parts/Mac_Mini_Unibody/Logic_Boards`,
   `https://www.ifixit.com/Parts/Mac_Mini_Unibody/Power_Supplies`,
   `https://www.ifixit.com/Parts/Mac_Mini_Unibody/SSD_Upgrade_Kits`,
   `https://www.ifixit.com/Parts/MacBook_Air/Hard_Drives`,
   `https://www.ifixit.com/Parts/MacBook_Air/Logic_Boards`,
   `https://www.ifixit.com/Parts/MacBook_Air/SSD_Enclosures`,
   `https://www.ifixit.com/Parts/MacBook_Air_11"/Logic_Boards`,
   `https://www.ifixit.com/Parts/MacBook_Air_13"/Hard_Drives`,
   `https://www.ifixit.com/Parts/MacBook_Air_13"/Logic_Boards`,
   `https://www.ifixit.com/Parts/MacBook_Air_13"/Logic_Boards`,
   `https://www.ifixit.com/Parts/MacBook_Air_13"/Logic_Boards`,
   `https://www.ifixit.com/Parts/MacBook_Air_13"/SSD_Enclosures`,
   `https://www.ifixit.com/Parts/MacBook_Air_13"_Early_2015/SSD_Enclosures`,
   `https://www.ifixit.com/Parts/MacBook_Air_13"_Early_2017/SSD_Enclosures`,
   `https://www.ifixit.com/Parts/MacBook_Air_13"_Retina_Display_2020/Logic_Boards`,
   `https://www.ifixit.com/Parts/MacBook_Air_13"_Retina_Display_2020/Screens`,
   `https://www.ifixit.com/Parts/MacBook_Air_13”_Retina_Display_Late_2018/Logic_Boards`,
   `https://www.ifixit.com/Parts/MacBook_Pro/Case_Components`,
   `https://www.ifixit.com/Parts/MacBook_Pro/Hard_Drives`,
   `https://www.ifixit.com/Parts/MacBook_Pro/Heat_Sinks`,
   `https://www.ifixit.com/Parts/MacBook_Pro/Logic_Boards`,
   `https://www.ifixit.com/Parts/MacBook_Pro/Rubber_Feet`,
   `https://www.ifixit.com/Parts/MacBook_Pro/SSD_Enclosures`,
   `https://www.ifixit.com/Parts/MacBook_Pro/SSD_Upgrade_Kits`,
   `https://www.ifixit.com/Parts/MacBook_Pro_13"_Retina_Display/Logic_Boards`,
   `https://www.ifixit.com/Parts/MacBook_Pro_13"_Retina_Display_Early_2015/Logic_Boards`,
   `https://www.ifixit.com/Parts/MacBook_Pro_13"_Retina_Display_Early_2015/SSD_Enclosures`,
   `https://www.ifixit.com/Parts/MacBook_Pro_13"_Retina_Display_Late_2013/Logic_Boards`,
   `https://www.ifixit.com/Parts/MacBook_Pro_13"_Retina_Display_Mid_2014/Logic_Boards`,
   `https://www.ifixit.com/Parts/MacBook_Pro_13"_Touch_Bar_2017/Logic_Boards`,
   `https://www.ifixit.com/Parts/MacBook_Pro_13"_Touch_Bar_Late_2016/Logic_Boards`,
   `https://www.ifixit.com/Parts/MacBook_Pro_15"_Retina_Display_Mid_2014/Screens`,
   `https://www.ifixit.com/Parts/MacBook_Pro_15"_Touch_Bar_2017/Logic_Boards`,
   `https://www.ifixit.com/Parts/MacBook_Pro_15"_Touch_Bar_2018/Logic_Boards`,
   `https://www.ifixit.com/Parts/MacBook_Pro_15"_Touch_Bar_2019/Logic_Boards`,
   `https://www.ifixit.com/Parts/MacBook_Pro_15"_Touch_Bar_Late_2016/Logic_Boards`,
   `https://www.ifixit.com/Parts/MacBook_Pro_16"_2019/Logic_Boards`,
   `https://www.ifixit.com/Parts/MacBook_Unibody_Model_A1278/SSD_Upgrade_Kits`,
   `https://www.ifixit.com/Parts/Microsoft_Surface_Laptop/Batteries`,
   `https://www.ifixit.com/Parts/Microsoft_Surface_Pro_6/Screens`,
   `https://www.ifixit.com/Parts/Motorola_Moto_G_Play_(2021)/Batteries`,
   `https://www.ifixit.com/Parts/Motorola_Moto_G_Power_(2021)/Batteries`,
   `https://www.ifixit.com/Parts/Motorola_Moto_G_Stylus_(2020)/Screens`,
   `https://www.ifixit.com/Parts/OnePlus_7_Pro/Batteries`,
   `https://www.ifixit.com/Parts/OnePlus_Phone/Motherboards`,
   `https://www.ifixit.com/Parts/PC_Laptop/Case_Components`,
   `https://www.ifixit.com/Parts/PlayStation_3/Thermal_Pads`,
   `https://www.ifixit.com/Parts/PlayStation_3_Super_Slim/Motherboards`,
   `https://www.ifixit.com/Parts/PlayStation_4/Screws`,
   `https://www.ifixit.com/Parts/PlayStation_4_Pro/Screws`,
   `https://www.ifixit.com/Parts/PlayStation_5/Motherboards`,
   `https://www.ifixit.com/Parts/PlayStation_5/Optical_Drives`,
   `https://www.ifixit.com/Parts/Retina_MacBook_2015/Keyboards`,
   `https://www.ifixit.com/Parts/Samsung_Galaxy_S21_Ultra/Batteries`,
   `https://www.ifixit.com/Parts/Samsung_Galaxy_S7_Edge/Motherboards`,
   `https://www.ifixit.com/Parts/Samsung_Gear_Fit2/Batteries`,
   `https://www.ifixit.com/Parts/Steam_Deck/Fans`,
   `https://www.ifixit.com/Parts/Steam_Deck/Power_Supplies`,
   `https://www.ifixit.com/Parts/ThinkPad_X1_Carbon_(3rd_Gen)/Batteries`,
   `https://www.ifixit.com/Parts/ThinkPad_X1_Carbon_(5th_Gen)/Batteries`,
   `https://www.ifixit.com/Parts/Valve_Index/Cables`,
   `https://www.ifixit.com/Parts/Xbox_One/Screws`,
   `https://www.ifixit.com/Parts/Xbox_One_S/Motherboards`,
   `https://www.ifixit.com/Parts/Xbox_One_X/Motherboards`,
   `https://www.ifixit.com/Parts/Xbox_Series_S/Power_Supplies`,
   `https://www.ifixit.com/Parts/Xbox_Series_X/Case_Components`,
];

type NoIndexExemptionsType = {
   [handle: string]: {
      root?: boolean;
      itemTypes?: string[];
   };
};

const legacyExemptions: NoIndexExemptionsType = {};
urls.forEach((url) => {
   const path = decodeURIComponent(new URL(url).pathname);
   const pathParts = path.split('/').filter(Boolean);
   const deviceTitle = pathParts[1];
   const itemType = pathParts[2];
   if (!deviceTitle) {
      return;
   }
   if (!legacyExemptions[deviceTitle]) {
      legacyExemptions[deviceTitle] = {};
   }
   if (itemType) {
      if (legacyExemptions[deviceTitle].itemTypes) {
         legacyExemptions[deviceTitle].itemTypes?.push(itemType);
      } else {
         legacyExemptions[deviceTitle].itemTypes = [itemType];
      }
   } else {
      legacyExemptions[deviceTitle].root = true;
   }
});

const legacyTagToItemType: Record<string, string> = {
   AC_Inlets: 'Ports',
   Adapters: 'Power_Adapters',
   Adhesive_Strips: 'Adhesives',
   Bluetooth_Boards: 'Wireless_Boards',
   Bumpers: 'Case_Components',
   Card_Cages: 'Case_Components',
   Charger_Boards: 'Boards',
   Click_Wheels: 'Buttons',
   Clips: 'Brackets',
   Controllers: 'Case_Components',
   'DC-In_Boards': 'Ports',
   Digitizers: 'Screens',
   Displays: 'Screens',
   Dock_Connectors: 'Cables',
   Docks: 'Ports',
   Earbuds: 'Accessories',
   Flash: 'Case_Components',
   Front_Panels: 'Screens',
   Hard_Drive_Brackets: 'Brackets',
   Hard_Drive_Enclosures: 'Case_Components',
   Hard_Drive_Kits: 'Kits',
   'Hard_Drives_\\(PATA\\)': 'Hard_Drives',
   'Hard_Drives_\\(SATA\\)': 'Hard_Drives',
   Hinges: 'Case_Components',
   'I/O_Board': 'Boards',
   Induction_Coil: 'Charging_Coils',
   Inverters: 'Boards',
   LCDs: 'Screens',
   Lenses: 'Cameras',
   Lightning_Connector: 'Cables',
   Logic_Boards: 'Motherboards',
   Magnets: 'Case_Components',
   Memory_Maxxer_Kits: 'RAM',
   Midframe: 'Case_Components',
   Power_Jacks: 'Ports',
   Rubber_Feet: 'Case_Components',
   SD_Card: 'Hard_Drives',
   SSD_Upgrade_Kits: 'Hard_Drives',
   SSDs: 'Hard_Drives',
   Straps: 'Case_Components',
   Styluses: 'Accessories',
   Test_Cables: 'Cables',
   Timing_Control_Boards: 'Boards',
   USB_Boards: 'Boards',
   'Wi-Fi_Boards': 'Wireless_Boards',
   Wireless: 'Wireless_Boards',
};

const legacyTagsWithNoItemType = [
   'Audio',
   'Bearings',
   'Belts',
   'Computers',
   'Consumables',
   'DC-to-DC_Boards',
   'Filters',
   'Gaskets',
   'iFixit_Exclusives',
   'Inspection',
   'Lasers',
   'Manuals',
   'Microsoft_ASP',
   'Modems',
   'Motors',
   'PC_Cards',
   'PCIe',
   'Propellers',
   'Pulleys',
   'Pumps',
   'Retail_Display',
   'RJ-11_Boards',
   'SD_Card_Slots',
   'Software',
   'Teardown_Case',
   'Textile_Repair',
   'Thermal_Pads',
   'Vaude',
];

const exemptionsMap: NoIndexExemptionsType = structuredClone(legacyExemptions);
Object.entries(legacyExemptions).forEach(([deviceTitle, exemptions]) => {
   if (!exemptions.itemTypes) {
      return;
   }
   const newItemTypes = new Set(exemptions.itemTypes);
   exemptions.itemTypes.forEach((itemType) => {
      if (legacyTagToItemType[itemType]) {
         newItemTypes.add(legacyTagToItemType[itemType]);
      } else if (!legacyTagsWithNoItemType.includes(itemType)) {
         newItemTypes.add(itemType);
      }
   });
   exemptionsMap[deviceTitle].itemTypes = Array.from(newItemTypes);
});

console.log(exemptionsMap);
