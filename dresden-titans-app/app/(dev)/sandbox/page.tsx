"use client";

import { useState } from "react";
import SubmitContentModal from "../../../components/DrillDetailModal";

export default function SandboxPage() {
  const [isModalOpen, setIsModalOpen] = useState(true);

  return (
    <div className="min-h-screen bg-slate-50 p-10">
      <SubmitContentModal 
        isOpen={isModalOpen} 
        onClose={() => setIsModalOpen(false)} 
      />
    </div>
  );
}