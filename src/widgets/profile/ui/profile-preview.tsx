import { useState, useCallback } from "react";
import { EditProfilePreview, EditProfileModal } from "@/features/edit-profile";

function ProfilePreview() {
  const [isOpen, setIsOpen] = useState(false);

  const handleOpen = useCallback(() => {
    setIsOpen(true);
  }, []);

  return (
    <div className="w-1/3 min-w-2xs h-full border-r border-(--border-primary) overflow-auto">
      <EditProfilePreview onEdit={handleOpen} />
      <EditProfileModal isOpen={isOpen} onClose={() => setIsOpen(false)} />
    </div>
  );
}

export default ProfilePreview;
