interface Props {
  base_stat: number;
  stat: string;
}

export default function Bar({ base_stat, stat }: Props) {
  return (
    <div className="mb-3 mr-4">
      <div className="flex justify-between">
        <span>{stat}</span>
        <span>{base_stat}</span>
      </div>
      <div className="w-full h-2 bg-gray-200 rounded-full">
        <div
          className="h-full bg-green-400 rounded-full"
          style={{ width: `${base_stat < 100 ? base_stat : 100}%` }}
        />
      </div>
    </div>
  );
}
