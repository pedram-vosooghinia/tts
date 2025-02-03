"use client";
import * as React from "react";
import useSWR, { mutate } from "swr";
import LoadingModal from "@/components/MainComponents/LoadingModal";
import PTable2 from "@/components/PComponent/table/Ptable2";
import { Hashtag } from "@/types/hashtags";
import { Hashtagcolumns } from "./HashtagColumns";
import { Button } from "@/components/ui/button";
import { ChevronDown } from "lucide-react";
import AddHashtag from "./AddHashtag";
import ExportHashatg from "./ExportHashatg";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuTrigger,
  DropdownMenuItem,
  DropdownMenuSeparator,
} from "@/components/ui/dropdown-menu";
import { hashtagTypeStore } from "@/store/hashtagTypeStore";
export default function GetHashtags() {
  const { selectedType, setSelectedType } = hashtagTypeStore();

  const { data: hashtagGetData, isLoading } = useSWR(
    `/hashtags/get?type=${selectedType}`
  );
  const hashtags = hashtagGetData?.data || [];
  const handleTypeChange = (type: string) => {
    setSelectedType(type);
    mutate(`/hashtags/get?type=${type}`);
  };

  if (isLoading) {
    return <LoadingModal />;
  }

  return (
    <div className="flex flex-col mx-4">
      <div className="flex justify-between items-center">
        <div>
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="outline" className="ml-auto">
                {selectedType ? `نوع: ${selectedType}` : "تغییر نوع هشتگ"}
                <ChevronDown />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent>
              <DropdownMenuItem onClick={() => handleTypeChange("tts")}>
                tts
              </DropdownMenuItem>
              <DropdownMenuItem onClick={() => handleTypeChange("rain.g")}>
                rain.g
              </DropdownMenuItem>
              <DropdownMenuItem onClick={() => handleTypeChange("hebe")}>
                hebe
              </DropdownMenuItem>
              <DropdownMenuSeparator />
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
        <AddHashtag />
        <ExportHashatg hashtags={hashtags} />
      </div>
      <PTable2<Hashtag> data={hashtags} columns={Hashtagcolumns} />
    </div>
  );
}
