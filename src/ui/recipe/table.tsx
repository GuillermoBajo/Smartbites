import { getFilteredRecipes } from "@/lib/dao/recipe";
import { Recipe } from "@prisma/client";
import Link from "next/link";

export default async function InvoicesTable({
  query,
  currentPage,
}: {
  query: string;
  currentPage: number;
}) {
  const recipes = await getFilteredRecipes(query, currentPage);

  return (
    <div className="mt-6 flow-root">
      <div className="inline-block min-w-full align-middle">
        <div className="rounded-lg bg-gray-50 p-2 w-full md:pt-0">
          <table className="table-auto w-full">
            <thead>
              <tr>
                <th className="w-1/2 px-3 py-2">Recipe</th>
                <th className="w-1/10 px-3 py-2">Calories</th>
                <th className="w-1/10 px-3 py-2">Protein</th>
                <th className="w-1/10 px-3 py-2">Fat</th>
                <th className="w-1/10 px-3 py-2">Carbohydrates</th>
              </tr>
            </thead>
            <tbody className="bg-white">
              {recipes.map((recipe: Recipe) => (
                <tr
                  key={recipe.id}
                  className="w-full border-b py-3 text-sm last-of-type:border-none [&:first-child>td:first-child]:rounded-tl-lg [&:first-child>td:last-child]:rounded-tr-lg [&:last-child>td:first-child]:rounded-bl-lg [&:last-child>td:last-child]:rounded-br-lg"
                >
                  <td className="whitespace-nowrap w-1/2 py-3 pl-6 pr-3">
                    <Link href={`/dashboard/recipe/${recipe.id}`}>
                      <p>{recipe.title}</p>
                    </Link>
                  </td>
                  <td className="whitespace-nowrap w-1/10 px-3 py-3 text-center">
                    {recipe.calories || 'N/A'}
                  </td>
                  <td className="whitespace-nowrap w-1/10 px-3 py-3 text-center">
                    {recipe.protein || 'N/A'}
                  </td>
                  <td className="whitespace-nowrap w-1/10 px-3 py-3 text-center">
                    {recipe.fat || 'N/A'}
                  </td>
                  <td className="whitespace-nowrap w-1/10 px-3 py-3 text-center">
                    {recipe.carbohydrates || 'N/A'}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>

        </div>
      </div>
    </div>
  );
}
