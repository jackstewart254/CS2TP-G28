"use client";

import React, { useCallback, useEffect, useRef, useState } from "react";


import { Rnd } from "react-rnd";
import { CheckCircle, MinusCircle, ChevronDown, ChevronRight } from "lucide-react";

import { TextWidget } from "./widgets/TextWidget";
import { GraphWidget } from "./widgets/GraphWidget";
import { ChartWidget } from "./widgets/ChartWidget";

import { textData, hourlyData, dailyData, pieChartData, barChartData } from "./data";

const styles = {
  page: `min-h-screen bg-[rgb(245,245,245)] dark:bg-[rgb(20,20,20)]`,
  header: `w-full flex items-center justify-between p-4 bg-[rgb(230,230,230)] dark:bg-[rgb(30,30,30)] text-[rgb(20,20,20)] dark:text-[rgb(220,220,220)]`,
  headerTitle: `text-xl font-bold text-[rgb(20,20,20)] dark:text-[rgb(220,220,220)]`,

  layout: `flex`,

  sidebar: `w-64 p-6 min-h-screen bg-[rgb(220,220,220)] dark:bg-[rgb(40,40,40)] text-[rgb(20,20,20)] dark:text-[rgb(220,220,220)]`,
  sidebarTitle: `flex items-center justify-between mb-4`,
  groupButton: `flex items-center justify-between w-full font-semibold mb-2 p-1 rounded cursor-pointer text-sm hover:bg-[rgb(200,200,200)] dark:hover:bg-[rgb(60,60,60)]`,
  sidebarList: `ml-2 space-y-1`,
  sidebarItem: `flex justify-between w-full p-2 rounded text-sm hover:bg-[rgb(200,200,200)] dark:hover:bg-[rgb(60,60,60)]`,

  main: `flex-1 p-6 relative bg-[rgb(250,250,250)] dark:bg-[rgb(10,10,10)]`,

  cardGrid: `grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-8`,
  staticCard: `relative rounded p-6 overflow-hidden shadow cursor-default min-h-[120px] bg-[rgb(230,230,230)] dark:bg-[rgb(40,40,40)]`,
  staticCardTitle: `text-xl font-semibold mb-2`,

  board: `relative min-h-[800px]`,
  snapLine: `pointer-events-none absolute rounded-md shadow-inner bg-[rgb(120,120,120)] dark:bg-[rgb(180,180,180)]`,

  rndWrapper: `shadow-md rounded border p-3 absolute bg-[rgb(245,245,245)] dark:bg-[rgb(35,35,35)] border-[rgb(180,180,180)] dark:border-[rgb(80,80,80)]`,

  closeBtn: `absolute top-1 right-1 p-1 rounded-full z-10 text-[rgb(255,0,0)] dark:text-[rgb(255,0,0)]`,

  previewBox: `rounded-lg shadow-md overflow-hidden pointer-events-auto bg-[rgb(245,245,245)] dark:bg-[rgb(35,35,35)] border-[rgb(180,180,180)] dark:border-[rgb(80,80,80)]`,
};

interface Item {
  id: string;
  x: number;
  y: number;
  z: number;
  width: number;
  height: number;
  widgetKey: string;
}

type WidgetType = "text" | "line" | "pie" | "bar";
const widgetDefinitions: Record<string,{ title: string; type: WidgetType; data?: any }
> = {
  Skills: { title: "Skills", type: "text", data: textData.Skills },
  Salary: { title: "Salary", type: "text", data: textData.Salary },
  Roles: { title: "Roles", type: "text", data: textData.Roles },
  Locations: { title: "Locations", type: "text", data: textData.Locations },
  Reports: { title: "Reports", type: "text", data: textData.Reports },

  lineGraph: { title: "Line graph", type: "line", data: { hourly: hourlyData, daily: dailyData } },
  pieChart: { title: "Pie chart", type: "pie", data: pieChartData },
  barChart: { title: "Bar chart", type: "bar", data: barChartData },
};

// widget category: widget type
const sidebarItems = {
  Text: ["Skills", "Salary", "Roles", "Locations", "Reports"],
  Charts: ["lineGraph", "pieChart", "barChart"],
};

export default function DashboardContent() {
  const [items, setItems] = useState<Item[]>([]);
  const [snapLine, setSnapLine] = useState<{ x?: number; y?: number; w?: number; h?: number }[]>([]);
  const [collapsedGroups, setCollapsedGroups] = useState<Record<string, boolean>>({ Text: false, Charts: true });

  // Z level management so selected elements are rendered above others
  var topZ = 100
  const nextZ = useCallback(() => ++topZ, []);
  const bringToFront = useCallback((id: string) => {
    const next = ++topZ;
    setItems((prev) => prev.map((it) => (it.id === id ? { ...it, z: next } : it)));
  }, []);

  // returns calculated position after snap + adds preview lines to be rendered
  const snapDistance = 20;
  const getSnappedPosition = useCallback(
    (item: Item, newX: number, newY: number) => {
      const previews: { x?: number; y?: number; w?: number; h?: number }[] = [];

      items.forEach((other) => {
        if (other.id === item.id) return;

        const itemRight = newX + item.width;
        const itemBottom = newY + item.height;
        const otherRight = other.x + other.width;
        const otherBottom = other.y + other.height;

        const vertOverlap = Math.max(0, Math.min(itemBottom, otherBottom) - Math.max(newY, other.y));
        const horizOverlap = Math.max(0, Math.min(itemRight, otherRight) - Math.max(newX, other.x));

        // left edge to other right
        if (Math.abs(newX - otherRight) < snapDistance && vertOverlap > 0) {
          newX = otherRight;
          previews.push({ x: otherRight - 2, y: Math.max(newY, other.y), w: 4, h: vertOverlap });
        }

        // right edge to other left
        else if (Math.abs(itemRight - other.x) < snapDistance && vertOverlap > 0) {
          newX = other.x - item.width;
          previews.push({ x: other.x - 2, y: Math.max(newY, other.y), w: 4, h: vertOverlap });
        }

        // top edge to other bottom
        else if (Math.abs(newY - otherBottom) < snapDistance && horizOverlap > 0) {
          newY = otherBottom;
          previews.push({ x: Math.max(newX, other.x), y: otherBottom - 2, w: horizOverlap, h: 4 });
        }

        // bottom edge to other top
        else if (Math.abs(itemBottom - other.y) < snapDistance && horizOverlap > 0) {
          newY = other.y - item.height;
          previews.push({ x: Math.max(newX, other.x), y: other.y - 2, w: horizOverlap, h: 4 });
        }
      });

      setSnapLine(previews);
      return { x: newX, y: newY };
    },
    [items]
  );

  const addWidgetByKey = (key: string) => {

    const widget = widgetDefinitions[key];
    const isChart = widget.type === "line" || widget.type === "bar" || widget.type === "pie";

    const newItem: Item = {
      widgetKey: key,
      // unique id
      id: `${key}-${Date.now()}`,
      // position offset by number of items so they overlap
      x: 40 + items.length * 10,
      y: 40 + items.length * 8,
      z: nextZ(),
      width: isChart ? 450 : 200,
      height: isChart ? 400: 150,
      
    };

    setItems((prev) => [...prev, newItem]);
  };

  const removeWidget = (id: string) => setItems((prev) => prev.filter((i) => i.id !== id));

  const updateItem = (id: string, data: Partial<Item>) =>
    setItems((prev) => prev.map((i) => (i.id === id ? { ...i, ...data } : i)));

  // renders widget data based on type
  const renderWidgetContent = (item: Item) => {
    const def = widgetDefinitions[item.widgetKey];
    

    if (def.type === "text") {
      return <TextWidget title={def.title} text={Array.isArray(def.data) ? def.data.join("\n") : def.data} />;
    }
    else if (def.type === "line") {
      return <GraphWidget title={def.title} hourlyData={def.data.hourly} dailyData={def.data.daily} />;
    }
    else if (def.type === "pie" || def.type === "bar") {
      return <ChartWidget title={def.title} type={def.type} data={def.data} />;
    }
    else return null;
  };

  return (
    <div className={styles.page}>
      <div className={styles.header}>
        <div className={styles.headerTitle}>Dashboard Overview</div>
      </div>

      <div className={styles.layout}>
        <aside className={styles.sidebar}>
          <div className={styles.sidebarTitle}>
            <div className="font-bold text-xl">Add Widgets</div>
          </div>

          {Object.entries(sidebarItems).map(([groupName, keys]) => {
            // dropdown for widget groups
            const collapsed = collapsedGroups[groupName]
            return (
              <div key={groupName}>
                <button
                  className={styles.groupButton}
                  onClick={() => setCollapsedGroups((prev) => ({ ...prev, [groupName]: !collapsed }))}
                >
                  <span>{groupName}</span>
                </button>

                {/* show widget names for non-collapsed groups */}
                {!collapsed && (
                  <ul className={styles.sidebarList}>
                    {keys.map((key) => {
                      const def = widgetDefinitions[key];
                      const isShown = items.some((i) => i.widgetKey === key);
                      return (
                        <li key={key}>
                          <button
                            className={styles.sidebarItem}
                            // create widget if not already shown
                            onClick={() => !isShown && addWidgetByKey(key)}
                          >
                            <span>{def.title}</span>
                            {/* display checkmark if widget shown */}
                            {isShown && <CheckCircle size={16} className="text-green-500" />}
                          </button>
                        </li>
                      );
                    })}
                  </ul>
                )}
              </div>
            );
          })}
        </aside>

        <main className={styles.main}>
            <div className={styles.board}>

              {/* show snap preview lines*/}
              {snapLine.map((line, idx) => (
                <div
                  key={idx}
                  className={`${styles.snapLine} bg-blue-500 opacity-70 rounded-md border-2 border-blue-700`}
                  style={{
                    left: line.x,
                    top: line.y,
                    width: line.w,
                    height: line.h,
                    zIndex: 9999,
                  }}
                />
              ))}

              {/* widgets converted to resizable and draggable elements */}
              {items.map((item) => (
                <Rnd
                  key={item.id}
                  size={{ width: item.width, height: item.height }}
                  position={{ x: item.x, y: item.y }}
                  bounds="parent"
                  cancel=".no-drag, input, textarea, button, .react-rnd-resize-handle"
                  style={{
                    display: "flex",
                    flexDirection: "column",
                    overflow: "hidden",
                    color: "inherit",
                    zIndex: item.z,
                  }}

                  onPointerDown={() => bringToFront(item.id)}
                  onDragStart={() => bringToFront(item.id)}
                  onResizeStart={() => bringToFront(item.id)}

                  // while dragging show snap preview lines
                  onDrag={(e, d) => {
                   getSnappedPosition(item, d.x, d.y);
                  }}

                  //TODO: show lines on resize

                  onDragStop={(e, d) => {
                    const snapped = getSnappedPosition(item, d.x, d.y);
                    updateItem(item.id, snapped);
                    setSnapLine([]);
                  }}
                  
                  onResizeStop={(e, dir, ref, delta, pos) => {
                    const snapped = getSnappedPosition(item, pos.x, pos.y);
                    updateItem(item.id, {
                      width: ref.offsetWidth,
                      height: ref.offsetHeight,
                      x: snapped.x,
                      y: snapped.y,
                    });
                    setSnapLine([]);
                  }}

                  className={styles.rndWrapper}
                  >

                  <button
                    onClick={() => removeWidget(item.id)}
                    className={styles.closeBtn}>
                    <MinusCircle size={16}/>
                  </button>

                  <div className="w-full h-full flex">
                    <div className="flex-1 min-h-[250px]">{renderWidgetContent(item)}</div>
                  </div>
                </Rnd>

              ))}
            </div>
        </main>
      </div>
    </div>
  );
}
