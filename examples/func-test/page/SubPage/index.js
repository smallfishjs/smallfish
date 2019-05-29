import i18n from "smallfish/i18n";
import { Alert } from "smallfish/antd";

const a = i18n.t("sf_page_SubPage_ChineseTest");
const b = i18n.t("sf_page_SubPage_IAmContinueToThe");

const d = "1";
const h = "12";

export default () => (
  <div>
    <Alert message={i18n.t("sf_page_SubPage_LaLa")} />
    <span>{i18n.t("sf_page_SubPage_HaHaHa")}</span>
    <span>{b}</span>
    <span>{i18n.t("sf_page_SubPage_DDaysHHours", { d: d, h: h })}</span>
    <span>{i18n.t("sf_page_SubPage_IAmTestHaHa")}</span>
    <span>
      {i18n.t("sf_page_SubPage_INowWithTheLanguage", {
        inlanguage: i18n.language
      })}
    </span>
  </div>
);
