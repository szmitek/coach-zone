import {
  Document,
  Font,
  Page,
  StyleSheet,
  Text,
  View,
} from "@react-pdf/renderer";
import {
  SECTION_LABELS,
  SECTION_ORDER,
  formatScheduledDate,
  formatTotalDuration,
  groupItemsBySection,
  type PdfWorkoutItem,
} from "@/lib/workouts";
import type { Workout } from "@/lib/supabase/types";

// @react-pdf/renderer's built-in fonts (Helvetica, Times, Courier) are the
// base-14 PDF fonts and only cover ASCII - Polish diacritics (ą, ę, ł, ś, ż,
// ć, ń, ó, ...) render as missing glyphs without a font that includes them.
// Noto Sans covers Latin Extended-A, so it's bundled locally and registered
// here rather than fetched from Google Fonts at render time - one less
// runtime dependency for a static asset that never changes.
Font.register({
  family: "Noto Sans",
  fonts: [
    { src: "/fonts/NotoSans-Regular.woff", fontWeight: "normal" },
    { src: "/fonts/NotoSans-Bold.woff", fontWeight: "bold" },
  ],
});

// The default hyphenation callback assumes English syllable rules and
// mangles Polish words when a line needs to break - disable it so long
// words wrap whole instead.
Font.registerHyphenationCallback((word) => [word]);

const styles = StyleSheet.create({
  page: {
    fontFamily: "Noto Sans",
    fontSize: 10,
    color: "#171717",
    padding: "32pt 40pt",
  },
  header: {
    marginBottom: 18,
    borderBottom: "1pt solid #e5e5e5",
    paddingBottom: 12,
  },
  title: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 4,
  },
  headerMeta: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: 10,
    fontSize: 10,
    color: "#525252",
  },
  section: {
    marginBottom: 14,
  },
  sectionTitle: {
    fontSize: 12,
    fontWeight: "bold",
    marginBottom: 6,
    color: "#059669",
  },
  item: {
    marginBottom: 8,
    paddingLeft: 10,
    borderLeft: "2pt solid #e5e5e5",
  },
  itemHeaderRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "flex-start",
  },
  itemTitle: {
    fontSize: 11,
    fontWeight: "bold",
    flexGrow: 1,
    flexShrink: 1,
    paddingRight: 8,
  },
  itemMeta: {
    fontSize: 9,
    color: "#525252",
    textAlign: "right",
  },
  itemDescription: {
    marginTop: 2,
    fontSize: 9,
    color: "#404040",
  },
  notes: {
    marginTop: 8,
    paddingTop: 10,
    borderTop: "1pt solid #e5e5e5",
  },
  notesTitle: {
    fontSize: 11,
    fontWeight: "bold",
    marginBottom: 4,
  },
  notesText: {
    fontSize: 9,
    color: "#404040",
  },
  footer: {
    position: "absolute",
    bottom: 24,
    left: 40,
    right: 40,
    fontSize: 8,
    color: "#a3a3a3",
    textAlign: "center",
  },
});

const MAX_DESCRIPTION_LENGTH = 220;

function truncateDescription(description: string | null): string | null {
  if (!description) return null;
  if (description.length <= MAX_DESCRIPTION_LENGTH) return description;
  return `${description.slice(0, MAX_DESCRIPTION_LENGTH).trimEnd()}…`;
}

export function WorkoutPdfDocument({
  workout,
  items,
}: {
  workout: Workout;
  items: PdfWorkoutItem[];
}) {
  const itemsBySection = groupItemsBySection(items);
  const totalMinutes = items.reduce(
    (sum, item) => sum + (item.duration_min ?? 0),
    0,
  );

  return (
    <Document title={workout.title}>
      <Page size="A4" style={styles.page}>
        <View style={styles.header}>
          <Text style={styles.title}>{workout.title}</Text>
          <View style={styles.headerMeta}>
            {workout.team_name && <Text>{workout.team_name}</Text>}
            <Text>{formatScheduledDate(workout.scheduled_for)}</Text>
            <Text>Łączny czas: {formatTotalDuration(totalMinutes)}</Text>
          </View>
        </View>

        {SECTION_ORDER.map((section) => {
          const sectionItems = itemsBySection.get(section) ?? [];
          if (sectionItems.length === 0) return null;

          return (
            <View key={section} style={styles.section} wrap={false}>
              <Text style={styles.sectionTitle}>{SECTION_LABELS[section]}</Text>
              {sectionItems.map((item) => {
                const description = truncateDescription(
                  item.exerciseDescription,
                );
                return (
                  <View key={item.id} style={styles.item}>
                    <View style={styles.itemHeaderRow}>
                      <Text style={styles.itemTitle}>{item.exerciseTitle}</Text>
                      <Text style={styles.itemMeta}>
                        {formatTotalDuration(item.duration_min ?? 0)}
                        {item.assigned_to ? ` · ${item.assigned_to}` : ""}
                      </Text>
                    </View>
                    {description && (
                      <Text style={styles.itemDescription}>{description}</Text>
                    )}
                  </View>
                );
              })}
            </View>
          );
        })}

        {workout.notes && (
          <View style={styles.notes}>
            <Text style={styles.notesTitle}>Notatki</Text>
            <Text style={styles.notesText}>{workout.notes}</Text>
          </View>
        )}

        <Text
          style={styles.footer}
          render={({ pageNumber, totalPages }) =>
            `Coach Zone · strona ${pageNumber} z ${totalPages}`
          }
          fixed
        />
      </Page>
    </Document>
  );
}
