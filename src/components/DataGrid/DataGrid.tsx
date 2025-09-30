// DataGrid.tsx
import React, { CSSProperties, useMemo, useRef, useState } from "react";

/**
 * Column<T>
 * - key: propriété du type T (ex: "name")
 * - header: libellé affiché dans l'en-tête
 * - width: largeur relative (utilisée dans gridTemplateColumns via "fr")
 */
export type Column<T> = { key: keyof T; header: string; width?: number };

/**
 * Sort<T>
 * - (key, dir): tri par clé asc/desc
 * - null: pas de tri
 */
export type Sort<T> = { key: keyof T; dir: "asc" | "desc" } | null;

/**
 * DataGridProps<T>
 * - rows: les données (tableau d'objets T)
 * - columns: configuration d’affichage des colonnes
 * - height: hauteur du conteneur scrollable
 * - rowHeight: hauteur d’une ligne (fixe, simplifie le calcul de fenêtre)
 * - overscan: nombre de lignes supplémentaires rendues avant/après la fenêtre
 * - initialSort: tri initial (ou null pour aucun tri)
 */
export type DataGridProps<T extends object> = {
  rows: T[];
  columns: Column<T>[];
  height?: number;
  rowHeight?: number;
  overscan?: number;
  initialSort: Sort<T>;
};

/**
 * DataGrid
 * - Virtualisation simple: calcule les indices de lignes à rendre selon scrollTop
 * - Tri: clic sur l’en-tête pour alterner asc -> desc -> none
 * - En-tête sticky: reste visible quand on scrolle
 */
function DataGrid<T extends object>({
  rows,
  columns,
  height = 400,
  rowHeight = 32,
  overscan = 6,
  initialSort = null,
}: DataGridProps<T>) {

  // Ref pour récupérer le conteneur scrollable (utile si besoin d’API imperative)
  const containerRef = useRef<HTMLDivElement | null>(null);

  // État local du tri (clé + direction, ou null = pas de tri)
  const [sort, setSort] = useState<Sort<T>>(initialSort);

  /**
   * Tri mémoïsé:
   * - Évite de resortir à chaque rendu si rows/sort n’ont pas changé.
   * - On clone rows pour ne pas muter la prop.
   * - Comparaison simple (string/number). Pour des données complexes, adapter.
   */
  const sortedRows = useMemo(() => {
    if (!sort) return rows;
    const { key, dir } = sort;
    const factor = dir === "asc" ? 1 : -1;
    const clone = rows.slice();
    clone.sort((a: any, b: any) => {
      const va = a[key];
      const vb = b[key];
      if (va === vb) return 0;
      return va > vb ? factor : -factor;
    });
    return clone;
  }, [rows, sort]);

  // État du scroll vertical (en px)
  const [scrollTop, setScrollTop] = useState(0);

  // Totaux et métriques de virtualisation
  const total = sortedRows.length;
  const totalHeight = total * rowHeight;

  // Index de départ/fin de la fenêtre visible (+ overscan au-dessus/dessous)
  const startIndex = Math.max(0, Math.floor(scrollTop / rowHeight) - overscan);
  const viewportCount = Math.ceil(height / rowHeight) + overscan * 2;
  const endIndex = Math.min(total - 1, startIndex + viewportCount);

  // Décalage vertical du bloc "fenêtre rendue" pour positionner les lignes correctement
  const offsetY = startIndex * rowHeight;

  // Les lignes effectivement rendues
  const visibleRows = sortedRows.slice(startIndex, endIndex + 1);

  // Handler de scroll: met à jour scrollTop (déclenche recalcul de la fenêtre)
  const onScroll: React.UIEventHandler<HTMLDivElement> = (e) => {
    setScrollTop(e.currentTarget.scrollTop);
  };

  // Style de l’en-tête sticky
  const headerStyle: CSSProperties = {
    position: "sticky",
    top: 0,
    background: "#fff",
    zIndex: 1,
    borderBottom: "1px solid #eee",
  };

  /**
   * Alterne le tri sur une clé: none -> asc -> desc -> none
   */
  function toggleSort(key: keyof T) {
    setSort((prev) => {
      if (!prev || prev.key !== key) return { key, dir: "asc" };
      if (prev.dir === "asc") return { key, dir: "desc" };
      return null;
    });
  }

  return (
    <div
      ref={containerRef}
      onScroll={onScroll}
      role="grid"
      aria-rowcount={total}
      style={{
        height,
        overflow: "auto",
        position: "relative",
        border: "1px solid #ddd",
        fontFamily: "system-ui, sans-serif",
        fontSize: 14,
      }}
    >
      {/* Espace total pour activer la scrollbar (hauteur = nbLignes * rowHeight) */}
      <div style={{ height: totalHeight, position: "relative" }}>
        {/* En-tête sticky (grid) */}
        <div
          role="row"
          style={{
            ...headerStyle,
            display: "grid",
            gridTemplateColumns: columns
              .map((c) => `${c.width ?? 1}fr`)
              .join(" "),
          }}
        >
          {columns.map((c) => (
            <div
              role="columnheader"
              key={String(c.key)}
              onClick={() => toggleSort(c.key)}
              style={{ padding: "6px 8px", cursor: "pointer", fontWeight: 600 }}
              title="Cliquer pour trier"
              aria-sort={
                sort?.key === c.key ? (sort.dir === "asc" ? "ascending" : "descending") : "none"
              }
            >
              {c.header}
              {sort?.key === c.key ? (sort.dir === "asc" ? " ▲" : " ▼") : ""}
            </div>
          ))}
        </div>

        {/* Fenêtre rendue (positionnée à offsetY + rowHeight pour ne pas chevaucher l’en-tête) */}
        <div
          role="rowgroup"
          style={{
            position: "absolute",
            top: offsetY + rowHeight,
            left: 0,
            right: 0,
            display: "grid",
            gridTemplateColumns: columns
              .map((c) => `${c.width ?? 1}fr`)
              .join(" "),
          }}
        >
          {visibleRows.map((row, i) => (
            // Clé: si l’objet possède un id, on l’utilise; sinon fallback sur un index stable local
            <React.Fragment key={(row as any).id ?? startIndex + i}>
              {columns.map((c) => (
                <div
                  role="gridcell"
                  key={c.key as string}
                  style={{
                    height: rowHeight,
                    lineHeight: `${rowHeight}px`,
                    padding: "0 8px",
                    borderBottom: "1px solid #f2f2f2",
                    whiteSpace: "nowrap",
                    overflow: "hidden",
                    textOverflow: "ellipsis",
                  }}
                >
                  {row[c.key] as string}
                </div>
              ))}
            </React.Fragment>
          ))}
        </div>
      </div>
    </div>
  );
}
export default DataGrid;