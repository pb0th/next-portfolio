type PropsType = {
  skill: SkillType;
  bgColor: string;
};
export default function SkillCard({ skill, bgColor }: PropsType) {
  return (
    <div
      className="h-96 w-full bg-gray-900 text-white flex items-center justify-center text-center p-10"
      style={{ borderRadius: "10px" }}
      id={skill.id}
    >
      <div>
        <div className="text-3xl font-bold">{skill.title}</div>
        <div className="mt-4 font-thin text-sm">{skill.description}</div>
      </div>
    </div>
  );
}
