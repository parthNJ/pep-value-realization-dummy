import { useState, useCallback, useRef } from "react";
import type { ValueNode } from "@/data/valueTree";

const NW = 172;
const NH = 76;
const COL_GAP = 96;
const ROW_GAP = 28;
const PAD = 40;

const C = {
  blue: "#3855B3",
  border: "#e2e8f0",
  borderHover: "#94a3b8",
  bg: "#fff",
  text: "#0f172a",
  sub: "#64748b",
  pos: "#059669",
  neg: "#dc2626",
  line: "#cbd5e1",
  lineActive: "#3855B3",
  selBg: "#f0f4ff",
  selBorder: "#3855B3",
  pathBg: "#fafbff",
  pathBorder: "#a5b4fc",
};

function NodeCard({ node, depth, isExpanded, hasChildren, isSelected, isOnPath, onClick, onOpenDrawer }: {
  node: ValueNode; depth: number; isExpanded: boolean; hasChildren: boolean;
  isSelected: boolean; isOnPath: boolean; onClick: () => void; onOpenDrawer: () => void;
}) {
  const isRoot = depth === 0;
  const pos = node.bw >= 0;

  let bg = C.bg, border = C.border, shadow = "0 1px 3px rgba(0,0,0,.04)";
  if (isRoot) { bg = C.blue; border = C.blue; shadow = "0 2px 8px rgba(56,85,179,.25)"; }
  else if (isSelected) { bg = C.selBg; border = C.selBorder; shadow = "0 2px 8px rgba(56,85,179,.15)"; }
  else if (isOnPath) { bg = C.pathBg; border = C.pathBorder; shadow = "0 1px 4px rgba(56,85,179,.08)"; }

  const fg = isRoot ? "#fff" : C.text;
  const subC = isRoot ? "rgba(255,255,255,.6)" : C.sub;
  const bwC = isRoot ? "rgba(255,255,255,.8)" : pos ? C.pos : C.neg;

  return (
    <div
      data-node-card
      onClick={(e) => { e.stopPropagation(); onClick(); }}
      style={{
        width: NW, minHeight: NH, borderRadius: 10, border: `1.5px solid ${border}`,
        background: bg, padding: "12px 14px",
        cursor: "pointer",
        display: "flex", flexDirection: "column", justifyContent: "center",
        boxShadow: shadow, userSelect: "none", transition: "all .2s ease",
        position: "relative",
      }}
      onMouseEnter={(e) => { if (!isRoot && !isSelected) { e.currentTarget.style.borderColor = C.borderHover; e.currentTarget.style.boxShadow = "0 2px 8px rgba(0,0,0,.08)"; } }}
      onMouseLeave={(e) => { if (!isRoot && !isSelected) { e.currentTarget.style.borderColor = isOnPath ? C.pathBorder : C.border; e.currentTarget.style.boxShadow = isOnPath ? "0 1px 4px rgba(56,85,179,.08)" : "0 1px 3px rgba(0,0,0,.04)"; } }}
    >
      <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
        <span style={{ fontSize: 11, fontWeight: 600, color: fg, lineHeight: 1.2, display: "flex", alignItems: "center", gap: 3 }}>
          {node.label}
          {hasChildren && <span style={{ fontSize: 9, opacity: .5, transition: "transform .2s", transform: isExpanded ? "rotate(0)" : "rotate(-90deg)", display: "inline-block" }}>▾</span>}
        </span>
        {/* Detail button */}
        <button
          onClick={(e) => { e.stopPropagation(); onOpenDrawer(); }}
          style={{
            background: isRoot ? "rgba(255,255,255,.15)" : "#f1f5f9",
            border: "none", cursor: "pointer",
            width: 24, height: 24, borderRadius: 6,
            display: "flex", alignItems: "center", justifyContent: "center",
            fontSize: 13, color: isRoot ? "rgba(255,255,255,.7)" : "#64748b",
            transition: "all .15s", flexShrink: 0,
          }}
          onMouseEnter={(e) => { e.currentTarget.style.background = isRoot ? "rgba(255,255,255,.25)" : "#e2e8f0"; e.currentTarget.style.color = isRoot ? "#fff" : C.blue; }}
          onMouseLeave={(e) => { e.currentTarget.style.background = isRoot ? "rgba(255,255,255,.15)" : "#f1f5f9"; e.currentTarget.style.color = isRoot ? "rgba(255,255,255,.7)" : "#64748b"; }}
          title="View details"
        >→</button>
      </div>
      <span style={{ fontSize: 16, fontWeight: 700, color: fg, marginTop: 2 }}>${node.nopbt.toFixed(1)}M</span>
      <div style={{ display: "flex", alignItems: "center", gap: 4, marginTop: 1 }}>
        <span style={{ fontSize: 10, fontWeight: 600, color: bwC }}>{pos ? "+" : ""}{node.bw.toFixed(1)}M</span>
        <span style={{ fontSize: 9, color: subC }}>vs target</span>
      </div>
    </div>
  );
}

/* ── path from root to target ── */
function getPathIds(tree: ValueNode, targetId: string): Set<string> {
  const path = new Set<string>();
  function walk(node: ValueNode, trail: string[]): boolean {
    if (node.id === targetId) { [...trail, node.id].forEach(id => path.add(id)); return true; }
    if (node.children) for (const c of node.children) if (walk(c, [...trail, node.id])) return true;
    return false;
  }
  walk(tree, []);
  return path;
}

/* ── recursive layout ── */
function layoutNodes(
  nodes: ValueNode[], x: number, yStart: number,
  exp: Set<string>, selectedId: string | null, pathIds: Set<string>,
  onClickNode: (node: ValueNode) => void, onOpenDrawer: (node: ValueNode) => void,
  depth: number, lines: React.ReactNode[], key: string,
): { elems: React.ReactNode[]; height: number } {
  const elems: React.ReactNode[] = [];
  let y = yStart;

  for (const node of nodes) {
    const nk = `${key}-${node.id}`;
    const hasKids = !!(node.children?.length);
    const isExp = exp.has(node.id);
    const isSel = selectedId === node.id;
    const isPath = pathIds.has(node.id);
    const nodeY = y;

    elems.push(
      <div key={nk} style={{ position: "absolute", left: x, top: nodeY, transition: "top .3s ease, left .3s ease" }}>
        <NodeCard node={node} depth={depth} isExpanded={isExp} hasChildren={hasKids}
          isSelected={isSel} isOnPath={isPath}
          onClick={() => onClickNode(node)}
          onOpenDrawer={() => onOpenDrawer(node)} />
      </div>
    );

    let stH = NH;
    if (isExp && hasKids) {
      const childX = x + NW + COL_GAP;
      const spineX = x + NW + COL_GAP * 0.45;
      const parentMidY = nodeY + NH / 2;

      // Check if ANY child is on the active path
      const anyChildOnPath = node.children!.some(c => pathIds.has(c.id));
      const parentLineColor = anyChildOnPath ? C.lineActive : C.line;
      const parentLineW = anyChildOnPath ? 2.5 : 1.5;

      // Horizontal line from parent to spine — only blue if a child is on path
      lines.push(<line key={`h-${nk}`} x1={x + NW + 1} y1={parentMidY} x2={spineX} y2={parentMidY} stroke={parentLineColor} strokeWidth={parentLineW} />);

      const childMids: { y: number; onPath: boolean }[] = [];
      let cy = nodeY;
      const childElems: React.ReactNode[] = [];

      for (const child of node.children!) {
        const cOnPath = pathIds.has(child.id);
        const cLnColor = cOnPath ? C.lineActive : C.line;
        const cLnW = cOnPath ? 2.5 : 1.5;
        const cMidY = cy + NH / 2;
        childMids.push({ y: cMidY, onPath: cOnPath });

        // Horizontal stub from spine to child — only blue if THIS child is on path
        lines.push(<line key={`s-${nk}-${child.id}`} x1={spineX} y1={cMidY} x2={childX - 1} y2={cMidY} stroke={cLnColor} strokeWidth={cLnW} />);

        const sub = layoutNodes([child], childX, cy, exp, selectedId, pathIds, onClickNode, onOpenDrawer, depth + 1, lines, nk);
        childElems.push(...sub.elems);
        cy += sub.height + ROW_GAP;
      }

      // Vertical spine — draw from parentMidY down through each child
      // We draw individual segments: parentMidY→firstChild, then between each pair of children
      if (childMids.length >= 1) {
        // Segment from parent horizontal junction to first child
        const firstSeg = childMids[0];
        // This segment is active if the first child is on the path
        const firstActive = firstSeg.onPath;
        lines.push(<line key={`vp-${nk}`} x1={spineX} y1={parentMidY} x2={spineX} y2={firstSeg.y}
          stroke={firstActive ? C.lineActive : C.line} strokeWidth={firstActive ? 2.5 : 1.5} />);

        // Segments between consecutive children
        for (let i = 0; i < childMids.length - 1; i++) {
          const fromY = childMids[i].y;
          const toY = childMids[i + 1].y;
          // Active if the lower child is on the path (the line leads TO it)
          const segActive = childMids[i + 1].onPath;
          lines.push(<line key={`v-${nk}-${i}`} x1={spineX} y1={fromY} x2={spineX} y2={toY}
            stroke={segActive ? C.lineActive : C.line} strokeWidth={segActive ? 2.5 : 1.5} />);
        }
      }

      stH = Math.max(cy - nodeY - ROW_GAP, NH);
      elems.push(...childElems);
    }

    y += stH + ROW_GAP;
  }
  return { elems, height: y - yStart - ROW_GAP };
}

function maxDepth(node: ValueNode, exp: Set<string>, d: number): number {
  if (!exp.has(node.id) || !node.children?.length) return d;
  return Math.max(...node.children.map(c => maxDepth(c, exp, d + 1)));
}

/* ── main component ── */
interface ValueTreeChartProps {
  tree: ValueNode;
  onOpenDrawer?: (node: ValueNode) => void;
}

export function ValueTreeChart({ tree, onOpenDrawer }: ValueTreeChartProps) {
  const [expanded, setExpanded] = useState<Set<string>>(
    new Set(["total-nopbt"])
  );
  const [selectedId, setSelectedId] = useState<string | null>("growth");

  // Drag-to-pan state
  const [pan, setPan] = useState({ x: 0, y: 0 });
  const [dragging, setDragging] = useState(false);
  const dragStart = useRef({ x: 0, y: 0, panX: 0, panY: 0 });

  const handleNodeClick = useCallback((node: ValueNode) => {
    setSelectedId(node.id);
    if (node.children?.length) {
      setExpanded(prev => {
        const next = new Set(prev);
        if (next.has(node.id)) next.delete(node.id); else next.add(node.id);
        return next;
      });
    } else {
      // Leaf node — auto open drawer
      onOpenDrawer?.(node);
    }
  }, [onOpenDrawer]);

  const handleOpenDrawer = useCallback((node: ValueNode) => {
    setSelectedId(node.id);
    onOpenDrawer?.(node);
  }, [onOpenDrawer]);

  const pathIds = selectedId ? getPathIds(tree, selectedId) : new Set<string>();
  const lines: React.ReactNode[] = [];
  const { elems, height } = layoutNodes([tree], PAD, PAD, expanded, selectedId, pathIds, handleNodeClick, handleOpenDrawer, 0, lines, "r");

  const depth = maxDepth(tree, expanded, 0);
  const canvasW = PAD + (depth + 1) * (NW + COL_GAP) + PAD;
  const canvasH = height + PAD * 2;

  // Clamp pan so the tree doesn't go too far off-screen
  const clampPan = useCallback((x: number, y: number) => {
    const maxX = Math.max(canvasW - 400, 0);
    const maxY = Math.max(canvasH - 200, 0);
    return {
      x: Math.max(-maxX, Math.min(100, x)),
      y: Math.max(-maxY, Math.min(50, y)),
    };
  }, [canvasW, canvasH]);

  const onPointerDown = useCallback((e: React.PointerEvent) => {
    // Only start drag on the background, not on node cards
    if ((e.target as HTMLElement).closest("[data-node-card]")) return;
    setDragging(true);
    dragStart.current = { x: e.clientX, y: e.clientY, panX: pan.x, panY: pan.y };
    (e.currentTarget as HTMLElement).setPointerCapture(e.pointerId);
  }, [pan]);

  const onPointerMove = useCallback((e: React.PointerEvent) => {
    if (!dragging) return;
    const dx = e.clientX - dragStart.current.x;
    const dy = e.clientY - dragStart.current.y;
    setPan(clampPan(dragStart.current.panX + dx, dragStart.current.panY + dy));
  }, [dragging, clampPan]);

  const onPointerUp = useCallback(() => {
    setDragging(false);
  }, []);

  return (
    <div
      onClick={() => {}}
      style={{
        border: "1px solid #e2e8f0", borderRadius: "10px 10px 0 0", background: "#fff",
        position: "relative", overflow: "hidden", flex: 1,
        cursor: dragging ? "grabbing" : "grab",
      }}
      onPointerDown={onPointerDown}
      onPointerMove={onPointerMove}
      onPointerUp={onPointerUp}
      onPointerLeave={onPointerUp}
    >
      {/* Dot pattern */}
      <div style={{
        position: "absolute", inset: 0,
        backgroundImage: "radial-gradient(circle, #e2e8f0 1px, transparent 1px)",
        backgroundSize: "24px 24px", opacity: 0.4, pointerEvents: "none",
      }} />

      {/* Header — stays fixed */}
      <div style={{ padding: "14px 16px 6px", position: "relative", zIndex: 2, background: "rgba(255,255,255,.9)", backdropFilter: "blur(4px)" }}>
        <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
          <div>
            <h3 style={{ fontSize: 12, fontWeight: 600, textTransform: "uppercase", letterSpacing: "0.05em", color: "#64748b", margin: 0 }}>
              Value Realization Tree
            </h3>
            <p style={{ fontSize: 11, color: "#94a3b8", margin: "2px 0 0" }}>Drag to pan · Click to expand · Click ⋯ for details</p>
          </div>
          <button
            onClick={(e) => { e.stopPropagation(); setPan({ x: 0, y: 0 }); }}
            style={{ background: "none", border: "1px solid #e2e8f0", borderRadius: 6, padding: "4px 10px", fontSize: 11, color: "#64748b", cursor: "pointer" }}
          >
            Reset view
          </button>
        </div>
      </div>

      {/* Pannable canvas */}
      <div style={{
        position: "relative",
        width: canvasW,
        height: canvasH,
        zIndex: 1,
        transform: `translate(${pan.x}px, ${pan.y}px)`,
        transition: dragging ? "none" : "transform .15s ease",
      }}>
        <svg style={{ position: "absolute", inset: 0, width: "100%", height: "100%", pointerEvents: "none" }}>
          {lines}
        </svg>
        {elems}
      </div>
    </div>
  );
}
