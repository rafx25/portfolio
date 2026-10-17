import { Document, Font, Page, StyleSheet, Text, View } from "@react-pdf/renderer";

import { site } from "@/lib/site";
import {
  resumeCaseStudiesLink,
  resumeContactLines,
  resumeEducation,
  resumeExperience,
  resumeSkillLines,
  resumeSummary,
  resumeSystems,
} from "@/lib/resume-content";

// Helvetica is one of the fonts built into the PDF spec, so the text stays
// real selectable text instead of being drawn as outlines. That is what makes
// the file readable by an applicant tracking system.
// Never hyphenate. A word split across lines extracts as two tokens, which is
// exactly the kind of thing that breaks keyword matching.
Font.registerHyphenationCallback((word) => [word]);

// A plain hyphen, not "•". The bullet glyph in the built-in font has no
// Unicode mapping, so a parser reads it as a broken character on every line.
const BULLET = "-";

const styles = StyleSheet.create({
  page: { paddingVertical: 36, paddingHorizontal: 44, fontFamily: "Helvetica" },
  // No letterSpacing anywhere: spaced-out capitals extract as separate letters
  // ("E D U C A T I O N"), and a parser then misses the section entirely.
  name: { fontSize: 17, fontFamily: "Helvetica-Bold" },
  role: { fontSize: 11, fontFamily: "Helvetica-Bold", marginTop: 3 },
  contact: { fontSize: 9, color: "#333333", marginTop: 5 },
  sectionTitle: {
    fontSize: 9.5,
    fontFamily: "Helvetica-Bold",
    marginTop: 14,
    paddingBottom: 3,
    borderBottomWidth: 0.75,
    borderBottomColor: "#999999",
  },
  body: { fontSize: 9.5, lineHeight: 1.4, marginTop: 6 },
  entry: { marginTop: 9 },
  entryRole: { fontSize: 10, fontFamily: "Helvetica-Bold" },
  entryMeta: { fontSize: 9, color: "#333333", marginTop: 1.5 },
  position: { fontSize: 9.5, marginTop: 2 },
  positions: { marginTop: 2, marginBottom: 2 },
  bulletRow: { flexDirection: "row", marginTop: 3 },
  bulletMark: { fontSize: 9.5, width: 10 },
  bulletText: { fontSize: 9.5, lineHeight: 1.4, flex: 1 },
  skillRow: { fontSize: 9.5, lineHeight: 1.4, marginTop: 3 },
  label: { fontFamily: "Helvetica-Bold" },
});

function Section({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <View>
      <Text style={styles.sectionTitle}>{title.toUpperCase()}</Text>
      <View>{children}</View>
    </View>
  );
}

export function ResumeDocument() {
  const { contact, links } = resumeContactLines();
  const caseStudies = resumeCaseStudiesLink();

  return (
    <Document
      title={`${site.name} - Resume`}
      author={site.name}
      subject={site.role}
      creator={site.name}
      producer={site.name}
    >
      <Page size="A4" style={styles.page}>
        <View>
          <Text style={styles.name}>{site.name.toUpperCase()}</Text>
          <Text style={styles.role}>{site.role}</Text>
          {contact ? <Text style={styles.contact}>{contact}</Text> : null}
          {links ? <Text style={styles.contact}>{links}</Text> : null}
        </View>

        <Section title="Professional Summary">
          <Text style={styles.body}>{resumeSummary}</Text>
        </Section>

        <Section title="Core Technical Skills">
          {resumeSkillLines().map((group) => (
            <Text key={group.category} style={styles.skillRow}>
              <Text style={styles.label}>{group.category}: </Text>
              {group.value}
            </Text>
          ))}
        </Section>

        <Section title="Professional Experience">
          {resumeExperience().map((item) => (
            // An organization with many positions is longer than the space left
            // on a page, so the entry may break between bullets. The heading
            // block keeps the first bullets with it, and no bullet splits.
            <View key={item.organization} style={styles.entry}>
              <View wrap={false} minPresenceAhead={40}>
                <Text style={styles.entryRole}>{item.organization}</Text>
                <Text style={styles.entryMeta}>{item.meta}</Text>
                <View style={styles.positions}>
                  {item.positions.map((position) => (
                    <Text
                      key={`${position.title}-${position.dates}`}
                      style={styles.position}
                    >
                      <Text style={styles.label}>{position.title}</Text>
                      {` | ${position.dates}`}
                    </Text>
                  ))}
                </View>
              </View>
              {item.highlights.map((line) => (
                <View key={line} style={styles.bulletRow} wrap={false}>
                  <Text style={styles.bulletMark}>{BULLET}</Text>
                  <Text style={styles.bulletText}>{line}</Text>
                </View>
              ))}
            </View>
          ))}
        </Section>

        <Section title="Delivered Systems">
          {resumeSystems().map((system) => (
            <View key={system.name} style={styles.bulletRow} wrap={false}>
              <Text style={styles.bulletMark}>{BULLET}</Text>
              <Text style={styles.bulletText}>
                <Text style={styles.label}>{system.name}</Text>
                {` - ${system.detail}`}
              </Text>
            </View>
          ))}
          {caseStudies ? <Text style={styles.skillRow}>{caseStudies}</Text> : null}
        </Section>

        <Section title="Education">
          {resumeEducation().map((item) => (
            <View key={item.qualification} style={styles.entry} wrap={false}>
              <Text style={styles.entryRole}>{item.qualification}</Text>
              <Text style={styles.entryMeta}>{item.meta}</Text>
            </View>
          ))}
        </Section>
      </Page>
    </Document>
  );
}
