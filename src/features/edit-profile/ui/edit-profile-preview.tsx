import { memo } from "react";
import { useCurrentUser } from "@/entities/user";
import { Profile } from "@/entities/user";
import { Pencil } from "lucide-react";

interface EditProfilePreviewProps {
  onEdit: () => void;
}

function EditProfilePreview({ onEdit }: EditProfilePreviewProps) {
  const { data: user } = useCurrentUser();

  if (!user) {
    return null;
  }

  return (
    <div className="flex itemsitems-start p-4 border-b border-(--border-primary)">
      <Profile user={user} size={4} />
      <div className="ml-auto cursor-pointer" onClick={onEdit}>
        <Pencil width={18} height={18} />
      </div>
    </div>
  );
}

export default memo(EditProfilePreview);
