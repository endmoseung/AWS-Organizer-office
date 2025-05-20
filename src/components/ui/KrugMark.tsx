const KrugMark = () => {
  return (
    <figure className="flex items-center gap-2">
      <img
        className="md:w-12 w-8"
        src="/aws-logo.png"
        alt="AWS Logo"
        width={48}
        height={48}
      />
      <figcaption className="text-muted-foreground">
        <img
          className="md:w-24 w-16 ml-[-2px]"
          src="/awskrug-title.svg"
          alt="AWS Logo"
          width={100}
          height={28}
        />
        <div className="text-xs text-muted-foreground">#프론트엔드 소모임</div>
      </figcaption>
    </figure>
  );
};

export default KrugMark;
