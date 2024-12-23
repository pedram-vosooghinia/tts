"use client";
import * as React from "react";
import PTable2 from "@/components/PTable/Ptable2";
import { Hashtag } from "@/types/Hashtags";
import { Hashtagcolumns } from "./HashtagColumns";

export default function ExampleUsage() {
  return (
    <PTable2<Hashtag> fetchUrl="/hashtags/getAll" columns={Hashtagcolumns} />
  );
}
