interface Props {
  title: string;
  description: string;
  image: string;
  index: number;
}

export default function CommitteeSummary({ title, description, image }: Props) {
  return (
    <div className="committee-card mt-[10vh] h-[80vh] max-h-[500px] min-w-[300px] md:min-w-[400px] flex-shrink-0 bg-white rounded-2xl shadow-lg overflow-hidden">
      <img src={image} alt={title} className="w-full h-60 object-cover" />
      <div className="p-6">
        <h3 className="font-bold text-[#A3841D] text-2xl mb-2">{title}</h3>
        <p className="text-base text-gray-700">{description}</p>
      </div>
    </div>
  );
}
