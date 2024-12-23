"use client";
import * as React from "react";
import useSWR, { mutate } from "swr";
import LoadingModal from "@/components/Main/LoadingModal";
import Modal from "@/components/Main/Modal";
import PTable2 from "@/components/PTable/Ptable2";
import { Hashtag } from "@/types/Hashtags";
import { Hashtagcolumns } from "./HashtagColumns";
import { Button } from "@/components/ui/button";
import { ChevronDown } from "lucide-react";
import AddHashtag from "./AddHashtag";
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
    `/hashtags/getAll?type=${selectedType}`
  );
  const hashtags = hashtagGetData?.data || [];
  console.log("hashtags", hashtags);
  const handleTypeChange = (type: string) => {
    setSelectedType(type);
    mutate(`/hashtags/getAll?type=${type}`);
  };

  if (isLoading) {
    return <LoadingModal />;
  }
  const buttonConfig = {
    modalName: "AddHashtag",
    buttonName: "افزودن هشتگ",
    className: "my-8",
  };
  return (
    <div className="flex flex-col mx-4">
      <div className="flex justify-center items-center">

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
      <Modal buttonConfig={buttonConfig}>
        <AddHashtag />
      </Modal>
      </div>

      <PTable2<Hashtag> data={hashtags} columns={Hashtagcolumns} />
    </div>
  );
}
