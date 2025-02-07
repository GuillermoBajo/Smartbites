import { getRecipe } from "@/lib/dao/recipe"
import { Recipe } from "@prisma/client";

export default async function Receta({ params }: { params: { id: string } }) {

  const receta: Recipe | null = await getRecipe(Number(params.id));
  if (!receta) return (<div>Receta no encontrada</div>);

  return (
    <div className="grid grid-cols-2 gap-4">
      <div className="space-y-4">
        {receta.image && <img src={receta.image} alt={receta.title} className="rounded-lg shadow-lg" />}
        <table className="table-auto border-collapse border border-green-800">
          <tr><td className="border border-green-600 p-2">Calories</td><td className="border border-green-600 p-2">{receta.calories}</td></tr>
          <tr><td className="border border-green-600 p-2">Fat</td><td className="border border-green-600 p-2">{receta.fat}</td></tr>
          <tr><td className="border border-green-600 p-2">Carbohydrates</td><td className="border border-green-600 p-2">{receta.carbohydrates}</td></tr>
          <tr><td className="border border-green-600 p-2">Protein</td><td className="border border-green-600 p-2">{receta.protein}</td></tr>
        </table>
      </div>
      <div className="space-y-4">
        <h2 className="text-2xl font-bold">{receta.title}</h2>
        <p className="text-lg">{receta.summary}</p>
        <ul className="list-disc list-inside">
          {receta.ingredients.map((ingredient, index) => (
            <li key={index} className="text-sm">{ingredient}</li>
          ))}
        </ul>
      </div>
    </div>
  )
}