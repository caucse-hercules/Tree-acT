import React, {
  Fragment,
  useState,
  useCallback,
  useRef,
  useEffect,
  MutableRefObject,
} from "react";

interface NodeProps {
  node: any;
  onCtrlClick: any;
}

function Node(nodeProps: NodeProps) {
  const { node, onCtrlClick } = nodeProps;
  const [nodeName, setNodeName] = useState<string>(node.data.name);
  const [editable, setEditable] = useState<boolean>(false);

  const width = 40;
  const height = 20;
  const ref = useRef() as MutableRefObject<SVGRectElement>;

  const onChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    setNodeName(e.target.value);
  }, []);

  const editOn = (e: React.MouseEvent) => {
    setEditable(true);
    console.log(editable);
  };

  const handelKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      setEditable(!editable);
      console.log("Entered");
    }
  };

  /*const handleClickOutside = (e : React.MouseEvent)=> {
    if (editable == true)
      setEditable(false);
  };*/

  useEffect(() => {
    window.onclick = (e: MouseEvent): any => {
      console.log("current ref : ", ref.current);
      console.log("target : ", e.target as Node);
      console.log(ref.current.contains(e.target as Node));
      if (editable == true) setEditable(false);
      console.log("window clicked");
      console.log(editable);
    };
  });

  return (
    <Fragment>
      {node.depth === 0 && (
        <circle r={12} fill="url('#lg')" onClick={onCtrlClick} />
      )}
      {node.depth !== 0 && (
        <rect
          ref={ref}
          height={height}
          width={width}
          y={-height / 2}
          x={-width / 2}
          fill={"#272b4d"}
          stroke={node.data.children ? "#03c0dc" : "#26deb0"}
          strokeWidth={1}
          strokeDasharray={!node.data.children ? "2,2" : "0"}
          strokeOpacity={!node.data.children ? 0.6 : 1}
          rx={!node.data.children ? 10 : 0}
          onClick={onCtrlClick}
          onDoubleClick={(e) => editOn(e)}
        />
      )}
      {editable ? (
        <foreignObject
          x={-width / 2}
          y={-height / 2}
          width={width * 1.2}
          height={height * 1.2}
        >
          <input
            type="text"
            value={nodeName}
            placeholder={nodeName}
            style={{ fontSize: 10 }}
            /*dy={".33em"}
        fontSize={9}
        fontFamily="Arial"
        textAnchor={"middle"}
        style={{ pointerEvents: "none" }}
        fill={
          node.depth === 0 ? "#71248e" : node.children ? "white" : "#26deb0"
        }*/
            onChange={(e) => onChange(e)}
            onKeyDown={handelKeyDown}
          />
        </foreignObject>
      ) : (
        <text
          dy={".33em"}
          fontSize={10}
          fontFamily="Arial"
          textAnchor={"middle"}
          style={{ pointerEvents: "none" }}
          fill={
            node.depth === 0 ? "#71248e" : node.children ? "white" : "#26deb0"
          }
        >
          {nodeName}
        </text>
      )}
    </Fragment>
  );
}

export default Node;
