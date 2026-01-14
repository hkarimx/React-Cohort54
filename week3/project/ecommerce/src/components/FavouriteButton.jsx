import heartRegular from "../assets/heart-regular.svg";
import heartSolid from "../assets/heart-solid.svg";
import { useFavourites } from "../context/FavouritesContext";

export default function FavouriteButton({ productId, className = "" }) {
    const { isFavourite, toggleFavourite } = useFavourites();
    const fav = isFavourite(productId);

    return (
        <button
            type="button"
            className={`favBtn ${className}`}
            onClick={(e) => {
                e.preventDefault();
                e.stopPropagation();
                toggleFavourite(productId);
            }}
            aria-label={fav ? "Remove from favourites" : "Add to favourites"}
            title={fav ? "Remove from favourites" : "Add to favourites"}
        >
            <img className="favIcon" src={fav ? heartSolid : heartRegular} alt="" />
        </button>
    );
}
