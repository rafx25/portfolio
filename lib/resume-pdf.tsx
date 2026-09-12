import { Document, Font, Page, StyleSheet, Text, View } from "@react-pdf/renderer";

import { site } from "@/lib/site";
import {
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

const styles = StyleSheet.create({
  page: { paddingVertical: 40, paddingHorizontal: 44, fontFamily: "Helvetica" },
  name: { fontSize: 17, fontFamily: "Helvetica-Bold", letterSpacing: 0.4 },
  role: { fontSize: 11, fontFamily: "Helvetica-Bold", marginTop: 3 },
  contact: { fontSize: 9, color: "#333333", marginTop: 5 },
  sectionTitle: {
    fontSize: 9.5,
    fontFamily: "Helvetica-Bold",
    letterSpacing: 0.8,
    marginTop: 14,
    paddingBottom: 3,
    borderBottomWidth: 0.75,
    borderBottomColor: "#999999",
  },
  body: { fontSize: 9.5, lineHeight: 1.4, marginTop: 6 },
  entry: { marginTop: 9 },
  entryRole: { fontSize: 10, fontFamily: "Helvetica-Bold" },
  entryMeta: { fontSize: 9, color: "#333333", marginTop: 1.5 },
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
            // wrap={false} keeps a single job from splitting across pages.
            <View key={item.meta} style={styles.entry} wrap={false}>
              <Text style={styles.entryRole}>{item.role}</Text>
              <Text style={styles.entryMeta}>{item.meta}</Text>
              {item.highlights.map((line) => (
                <View key={line} style={styles.bulletRow}>
                  <Text style={styles.bulletMark}>•</Text>
                  <Text style={styles.bulletText}>{line}</Text>
                </View>
              ))}
            </View>
          ))}
        </Section>

        <Section title="Delivered Systems">
          {resumeSystems().map((system) => (
            <View key={system.name} style={styles.bulletRow} wrap={false}>
              <Text style={styles.bulletMark}>•</Text>
              <Text style={styles.bulletText}>
                <Text style={styles.label}>{system.name} </Text>
                {`- ${system.detail}`}
              </Text>
            </View>
          ))}
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
