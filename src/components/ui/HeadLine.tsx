


interface HeadLineProps {
  title: string;
}

const HeadLine = ({ title }: HeadLineProps) => {
  return (
    <div className="flex items-center gap-6 w-full">
      <h2 className="h2 text-primary whitespace-nowrap">
        {title}
      </h2>

      <div className="flex-1 h-0.5 bg-[#94A3B880] border border-[#94A3B880]" />
    </div>
  );
};

export default HeadLine;