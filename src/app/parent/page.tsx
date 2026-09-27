import type { Metadata } from "next";
import { ParentPreviewClient } from "@/components/parent/parent-preview-client";

export const metadata: Metadata = {
  title: "Parent Preview · ThinkLab Kids",
  description:
    "Observable learning evidence preview for parents and guardians. Discover reasoning, explanations, and next steps without permanent ability labels.",
};

export default function ParentPage() {
  return <ParentPreviewClient />;
}
