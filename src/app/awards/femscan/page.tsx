import { FemScanArticle } from "@/components/awards/FemScanArticle";
import { pageMetadata } from "@/lib/metadata";

export const metadata = pageMetadata({
  title: "FemScan — AI-Assisted Cervical Health Screening",
  description:
    "The story behind FemScan, an award-winning healthcare technology project exploring cervical cytology image analysis and patient-history risk assessment.",
  path: "/awards/femscan",
});

export default function FemScanPage() {
  return <FemScanArticle />;
}
