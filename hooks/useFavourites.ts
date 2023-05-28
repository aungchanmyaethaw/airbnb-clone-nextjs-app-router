import { User } from "@prisma/client";
import { useRouter } from "next/navigation";
import useLoginModal from "./useLoginModal";
import axios from "axios";
import { toast } from "react-hot-toast";

interface useFavouritesProps {
  listingId: string;
  currentUser?: User | null;
}

const useFavourites = ({ listingId, currentUser }: useFavouritesProps) => {
  const router = useRouter();
  const loginModal = useLoginModal();

  const hasFavourite = () => {
    if (!listingId) {
      return;
    }

    const favouriteId = currentUser?.favouriteIds;

    return favouriteId?.includes(listingId);
  };

  const toggleFavourite = async (e: React.MouseEvent<HTMLButtonElement>) => {
    e.stopPropagation();
    if (!currentUser) {
      return loginModal.onOpen();
    }

    let request;

    if (hasFavourite()) {
      request = () => axios.delete(`/api/favourites/${listingId}`);
    } else {
      request = () => axios.post(`/api/favourites/${listingId}`);
    }

    try {
      await request();
      toast.success("Success");
      router.refresh();
    } catch (error: any) {
      toast.error("Something went wrong!");
    }
  };

  return { hasFavourite, toggleFavourite };
};

export default useFavourites;
