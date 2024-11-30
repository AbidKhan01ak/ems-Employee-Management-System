// utils.js
export function pageTitle(entity, id) {
    return (
        <h2 className="text-center mt-4">
            {id ? `Update ${entity}` : `Add ${entity}`}
        </h2>
    );
}
