import { Card } from "@/components/Card";
import { Input } from "@/components/Input";

export default function Analyze() {
  return (
    <Card>
      <h1 className="text-3xl text-white font-bold mb-4">Analyze Page</h1>
      <p className="text-zinc-400 mb-6">
        This is where the analysis will take place. Lorem ipsum dolor sit amet
        consectetur, adipisicing elit. Dicta illo voluptas, minus tempore
        dignissimos sit cumque quisquam consequatur quo quod porro magni dolore
        consectetur, alias perspiciatis sunt doloribus obcaecati mollitia
        sapiente nulla commodi a nemo. Pariatur qui, exercitationem id odit
        porro ratione quisquam consequatur non? Doloremque, tenetur culpa
        aliquam reiciendis doloribus iste sapiente? Sunt reprehenderit quas
        consequatur fuga fugiat eius, laborum blanditiis distinctio repellendus
        placeat, excepturi hic optio debitis reiciendis tenetur. Nostrum
        voluptate, incidunt rem deserunt corporis nesciunt autem dignissimos
        nihil voluptates reiciendis cum vel dolor aliquam perferendis. Vero
        sequi sit aliquid ad. Voluptatibus odio error blanditiis repudiandae
        distinctio eveniet.
      </p>
      <Input placeholder="Enter URL for analysis..." />
    </Card>
  );
}
